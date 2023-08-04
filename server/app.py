from flask import Flask, request, jsonify, make_response, session
from flask_sqlalchemy import SQLAlchemy
from models import *
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = b'W(H5q*N86Z/+J72'

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

#Add New Comment
@app.post('/comment')
def post_comment():
    json = request.json
    comment = Comment(text=json["text"], user_id=json["user_id"], post_id=json["post_id"])
    db.session.add(comment)
    db.session.commit()
    return comment.to_dict(), 201


if __name__ == "__main__":
    app.run(port=5555, debug=True)