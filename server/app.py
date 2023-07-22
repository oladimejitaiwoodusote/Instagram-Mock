from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from models import *
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.json.compact = False
app.secret_key = b'W(H5q*N86Z/+J72'

migrate = Migrate(app,db)
bcrypt = Bcrypt(app)

db.init_app(app)

#Create account
@app.post('/signup')
def signup():
    json = request.json
    pw_hash = bcrypt.generate_password_hash



if __name__ == "__main__":
    app.run(port=5555, debug=True)