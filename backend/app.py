from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['JWT_SECRET_KEY'] = "super-secret-key"  # change in production!

db = SQLAlchemy(app)
jwt = JWTManager(app)

import routes

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)


