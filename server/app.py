from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import *
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from sqlalchemy import create_engine, func
import os
import base64
import json
from google.cloud import storage
import random

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'pool_size': 3,
    'max_overflow': 2,
}
# app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
#     'pool_size': 5,  # Maximum number of permanent connections to keep.
#     'max_overflow': 2,  # Maximum number of overflow connections to create.
#     'pool_timeout': 30,  # Maximum number of seconds to wait for a connection from the pool.
#     'pool_recycle': 3600,  # Time in seconds a connection can be reused.
# }
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = os.environ.get('SECRET_KEY')

#Encoded
encoded_service_account_key = os.environ.get('SERVICE_ACCOUNT_KEY')
decoded_service_account_json = base64.b64decode(encoded_service_account_key).decode('utf-8')
service_account_info = json.loads(decoded_service_account_json)

storage_client = storage.Client.from_service_account_info(service_account_info)
bucket = storage_client.bucket('instagram-clone')

migrate = Migrate(app,db)
bcrypt = Bcrypt(app)

db.init_app(app)

#Check session
@app.get('/check_session')
def check_session():
    user_id = session.get('user_id')
    current_user = User.query.get(user_id)
    if current_user:
        return jsonify(current_user.to_dict()), 200
    else:
        return jsonify({"message": "Not logged in"}), 401

#Get user profile
@app.get('/user_profile/<int:id>')
def get_user(id):
    user = User.query.get(id)
    if user:
        return jsonify(user.to_dict()), 200
    else:
        return jsonify({"message": "User not found"}), 401

#Create account
@app.post('/signup')
def signup():
    json = request.json
    pw_hash = bcrypt.generate_password_hash(json['password']).decode('utf-8')
    new_user = User(email = json['email'], full_name=json['full_name'], username=json['username'], password = pw_hash)
    db.session.add(new_user)
    db.session.commit()
    session['user_id'] = new_user.id
    return jsonify(new_user.to_dict()), 201

#Login
@app.post('/login')
def login():
    json = request.json
    current_user = User.query.where(User.username == json['username']).first()
    if (current_user and bcrypt.check_password_hash(current_user.password, json['password'])):
        session['user_id'] = current_user.id
        return jsonify(current_user.to_dict()), 201
    else:
        return jsonify({"message": "Invalid username or password"}), 401

#Logout
@app.delete('/logout')
def logout():
    session.pop('user_id')
    return {}, 204

#Get Users Posts based on users id
@app.get('/users_posts/<int:id>')
def get_posts(id):
    #users_posts = Post.query.where(Post.user_id == id).all()
    users_posts = Post.query.filter_by(user_id = id).order_by(Post.created_at.desc()).all()
    post_dicts = [post.to_dict() for post in users_posts]
    return jsonify(post_dicts), 201

#Get Users Main Feed (Post of Users followed)
@app.get('/users_followee_posts/<int:id>')
def get_followee_posts(id):
    #Optimized version
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    followee_ids = [followee.id for followee in user.following]
    followee_posts = Post.query.filter(Post.user_id.in_(followee_ids)).order_by(Post.created_at.desc()).all()
    followee_posts_dicts = [post.to_dict() for post in followee_posts]

    return jsonify(followee_posts_dicts),200

#Get Users Discovery Page (Post of Users not followed)
@app.get('/user_discovery/<int:id>')
def get_discover_posts(id):
    #Optimized Version

    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    followed_user_ids = [followee.id for followee in user.following]
    discovery_posts = Post.query.filter(~Post.user_id.in_(followed_user_ids), Post.user_id != id).order_by(func.random()).limit(50).all()
    discovery_posts_dicts = [post.to_dict() for post in discovery_posts]

    return jsonify(discovery_posts_dicts), 200

#Get Posts comments
@app.get('/comments/<int:id>')
def get_comments(id):
    comments = Comment.query.where(Comment.post_id == id)
    comment_dicts = [comment.to_dict() for comment in comments]
    return jsonify(comment_dicts), 200

#Get Posts likes
@app.get('/likes/<int:id>')
def get_likes(id):
    likes = Like.query.where(Like.post_id == id)
    like_dicts = [like.to_dict() for like in likes]
    return jsonify(like_dicts), 200

#Get like status of Post for current user
@app.get('/like_status/<int:post_id>/<int:user_id>')
def get_like_status(post_id, user_id):
    like = Like.query.filter(Like.user_id == user_id, Like.post_id==post_id ).first() 
    if like:
        return jsonify({"message": True}), 200
    else:
        return jsonify({"message": False}), 404

#Like Post
@app.post('/like/<int:post_id>/<int:user_id>')
def like_post(post_id, user_id):
    like = Like.query.filter(Like.user_id == user_id, Like.post_id==post_id).first()
    if not like:
        new_like = Like(user_id = user_id, post_id = post_id)
        db.session.add(new_like)
        db.session.commit()
        likes_count = Like.query.filter(Like.post_id == post_id).count()
        return jsonify({"isLiked":True, "likesCount": likes_count}), 200
    else:
        return jsonify({"error":"Like already there"}), 404


#Unlike Post
@app.delete('/unlike/<int:post_id>/<int:user_id>')
def unlike_post(post_id, user_id):
    like = Like.query.filter(Like.user_id == user_id, Like.post_id==post_id).first()
    if like:
        db.session.delete(like)
        db.session.commit()
        likes_count = Like.query.filter(Like.post_id == post_id).count()
        return jsonify({"isLiked": False, "likesCount": likes_count}), 200
    else:
        return jsonify({"error": "Like not found"}), 404

#Add New Comment
@app.post('/comment')
def post_comment():
    json = request.json
    comment = Comment(text=json["text"], user_id=json["user_id"], post_id=json["post_id"])
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment.to_dict()), 201

#Delete Post
@app.delete('/delete_post/<int:post_id>')
def delete_post(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({"message": "Post not found"}), 404

    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": "Post deleted succssfully"}), 200

#Edit Post - caption
@app.patch('/edit_post/<int:id>')
def edit_post(id):
    json = request.json
    post = Post.query.get(id)

    if not post:
        return jsonify({'message': 'Post not found'}), 404

    post.caption = json['caption']
    db.session.commit()
    return jsonify(post.to_dict()), 200

#Checking if user is following prfile
@app.get('/is_following/<int:user_id>/<int:profile_id>')
def is_following(user_id, profile_id):
    user = User.query.get(user_id)
    followings = user.following
    profile = User.query.get(profile_id)

    if profile in followings:
        return jsonify({'message': True}), 201
    else:
        return jsonify({"message": False}),201

#Follow User
@app.post('/follow/<int:user_id>/<int:profile_id>')
def follow(user_id, profile_id):
    user = User.query.get(user_id)
    following = user.following
    profile_user = User.query.get(profile_id)
    following.append(profile_user)
    db.session.commit()
    return jsonify({'message': "Followed"}), 201

#Unfollow User
@app.delete('/unfollow/<int:user_id>/<int:profile_id>')
def unfollow(user_id, profile_id):
    user = User.query.get(user_id)
    following = user.following
    profile_user = User.query.get(profile_id)
    following.remove(profile_user)
    db.session.commit()
    return jsonify({'message': "Unfollowed"}), 201

#Get List of Users for search bar
@app.get('/users')
def users():
    users = User.query.all()
    user_dicts = [user.to_dict() for user in users]
    return jsonify(user_dicts), 201

#Upload Image to Bucket
@app.post('/image_upload')
def upload_image():
    #Upload image to storage bucket
    image = request.files['image']
    if image:
        image_blob = bucket.blob(image.filename)
        image_blob.upload_from_file(image)

        #Upload image url to database
        caption = request.form.get('caption')
        image_url = image_blob.public_url
        user_id = session.get('user_id')

        if user_id is None:
            return jsonify({'error': 'User not logged in'}), 401

        new_post = Post(caption = caption, image=image_url, user_id = user_id)
        db.session.add(new_post)
        db.session.commit()

        return jsonify({'message': 'Image uploaded successfully'}), 201

    return jsonify({'message': 'No image uploaded'}), 401

#Edit User Profile
@app.patch('/edit_profile/<int:id>')
def update_profile(id):
    #Get user first
    user = User.query.get(id)
    #Check if password works
    if (bcrypt.check_password_hash(user.password, request.form.get('currentPassword'))):
        #Update avatar
        new_avatar = request.files.get('avatar')
        if new_avatar:
            new_avatar_blob = bucket.blob(new_avatar.filename)
            new_avatar_blob.upload_from_file(new_avatar)
            avatar_url = new_avatar_blob.public_url
            user.avatar = avatar_url

        new_username = request.form.get('username')
        if new_username:
            user.username = new_username

        new_full_name = request.form.get('fullName')
        if new_full_name:
            user.full_name = new_full_name

        new_email = request.form.get('email')
        if new_email:
            user.email = new_email

        new_password = request.form.get('password')
        if new_password:
            #pw_hash = bcrypt.generate_password_hash(json['password']).decode('utf-8')
            pw_hash = bcrypt.generate_password_hash(new_password).decode('utf-8')
            user.password = pw_hash        

        db.session.commit()
        return jsonify({"message": "Profile updated successfully"}), 200

    else:
        return jsonify({'message': 'Password not correct'}), 400


if __name__ == "__main__":
    with app.app_context():
        print("pool size ={}".format(db.engine.pool.size()))
    app.run(port=5555, debug=False)
