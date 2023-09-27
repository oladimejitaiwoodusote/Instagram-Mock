from flask import Flask, request, jsonify, make_response, session
from flask_sqlalchemy import SQLAlchemy
from models import *
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
import os
from werkzeug.utils import secure_filename
from google.cloud import storage

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = b'W(H5q*N86Z/+J72'

#Cloud Lines
service_account_key_path = os.environ.get('SERVICE_ACCOUNT_KEY_PATH')
storage_client = storage.Client.from_service_account_json(service_account_key_path)
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
        return current_user.to_dict(), 200
    else:
        return {"message": "Not logged in"}, 401


#Create account
@app.post('/signup')
def signup():
    json = request.json
    pw_hash = bcrypt.generate_password_hash(json['password']).decode('utf-8')
    new_user = User(email = json['email'], full_name=json['full_name'], username=json['username'], password = pw_hash)
    db.session.add(new_user)
    db.session.commit()
    session['user_id'] = new_user.id
    return new_user.to_dict(), 201

#Login
@app.post('/login')
def login():
    json = request.json
    current_user = User.query.where(User.username == json['username']).first()
    if (current_user and bcrypt.check_password_hash(current_user.password, json['password'])):
        session['user_id'] = current_user.id
        return current_user.to_dict(), 201
    else:
        return {"message": "Invalid username or password"}, 401

#Get Users Posts based on users id
@app.get('/users_posts/<int:id>')
def get_posts(id):
    users_posts = Post.query.where(Post.user_id == id).all()
    post_dicts = [post.to_dict() for post in users_posts]
    return post_dicts, 201

#Get Posts comments
@app.get('/comments/<int:id>')
def get_comments(id):
    comments = Comment.query.where(Comment.post_id == id)
    comment_dicts = [comment.to_dict() for comment in comments]
    return comment_dicts, 200

#Get Posts likes
@app.get('/likes/<int:id>')
def get_likes(id):
    likes = Like.query.where(Like.post_id == id)
    like_dicts = [like.to_dict() for like in likes]
    return like_dicts, 200

#Get like status of Post for current user
@app.get('/like_status/<int:post_id>/<int:user_id>')
def get_like_status(post_id, user_id):
    like = Like.query.filter(Like.user_id == user_id, Like.post_id==post_id ).first() 
    if like:
        return {"message": True}
    else:
        return {"message": False}

#Like Post
@app.post('/like/<int:post_id>/<int:user_id>')
def like_post(post_id, user_id):
    like = Like.query.filter(Like.user_id == user_id, Like.post_id==post_id).first()
    if not like:
        new_like = Like(user_id = user_id, post_id = post_id)
        db.session.add(new_like)
        db.session.commit()

    likes_count = Like.query.filter(Like.post_id == post_id).count()
    return {"isLiked":True, "likesCount": likes_count}

#Unlike Post
@app.post('/unlike/<int:post_id>/<int:user_id>')
def unlike_post(post_id, user_id):
    like = Like.query.filter(Like.user_id == user_id, Like.post_id==post_id).first()
    if like:
        db.session.delete(like)
        db.session.commit()
    likes_count = Like.query.filter(Like.post_id == post_id).count()
    return {"isLiked": False, "likesCount": likes_count}

#Add New Comment
@app.post('/comment')
def post_comment():
    json = request.json
    comment = Comment(text=json["text"], user_id=json["user_id"], post_id=json["post_id"])
    db.session.add(comment)
    db.session.commit()
    return comment.to_dict(), 201


# #Upload Image to Bucket
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

        return jsonify({'message': 'Image uploaded succesfully'}), 201

    return jsonify({'message': 'No image uploaded'}), 401



if __name__ == "__main__":
    app.run(port=5555, debug=True)