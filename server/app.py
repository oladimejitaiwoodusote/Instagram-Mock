from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from models import *
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.json.compact = False
app.secret_key = b'W(H5q*N86Z/+J72'

migrate = Migrate(app,db)

db.init_app(app)




if __name__ == "__main__":
    app.run(port=5555, debug=True)