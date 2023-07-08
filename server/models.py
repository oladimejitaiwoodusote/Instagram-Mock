from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy

convention = {
  "ix": "ix_%(column_0_label)s",
  "uq": "uq_%(table_name)s_%(column_0_name)s",
  "ck": "ck_%(table_name)s_%(constraint_name)s",
  "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
  "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(metadata=metadata)

#Define Models: Users, Posts, Comments, Likes
#Relationships
#Constraints

class User(db.Model):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    full_name = db.Column(db.String, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String)
    avatar = db.Column(db.String)

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, server_default = db.func.now(), onupdate=db.func.now())

    posts = db.relationship("Post", backref='user')
    likes = db.relationship("Like", backref='user')
    comments = db.relationship("Comment", backref='user')


    def __repr__(self):
        return f"<User id={self.id} username={self.username}"

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "full_name": self.full_name,
            "username": self.username,
            "avatar": self.avatar
        }

class Post(db.Model):

    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key = True)
    caption = db.Column(db.String)
    image = db.Column(db.String, nullable=False)

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, server_default = db.func.now(), onupdate=db.func.now())

    user_id = db.Column(db.Integer, db.ForegnKey("users.id"))
    likes = db.relationship("Like", backref='post')
    comments = db.relationship("Comment", backref="comment")

    
    def __repr__(self):
        return f"<Post id={self.id} caption={self.caption} image={self.image}>"

    def to_dict(self):
        return {
            "id": self.id,
            "caption": self.caption,
            "image": self.image
        }

class Comment(db.Model):

    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key = True)
    text = db.Column(db.String, nullable=False)

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, server_default = db.func.now(), onupdate=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))

    def __repr__(self):
        return f"<Comment id={self.id} text={self.text}>"

    def to_dict(self):
        return {
            "id": self.id,
            "text": self.text
        }

class Like(db.Model):

    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key = True)

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, server_default = db.func.now(), onupdate=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))

    def __repr__(self):
        return f"<Like id={self.id}>"

    def to_dict(self):
        return {
            "id": self.id
        }