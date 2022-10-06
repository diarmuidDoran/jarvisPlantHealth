# main.py
import os
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_restx import Api
from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
from blueprints.documented_endpoints import blueprint as documented_endpoint

app = Flask(__name__)
Bcrypt(app)
CORS(app)
api = Api(app)
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_CONNECTION")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
jarvis_db = SQLAlchemy(app)
jarvis_db.init_app(app)

# migrate = Migrate(app.py, jarvis_db)
app.register_blueprint(documented_endpoint)

if __name__ == "__main__":
    app.run()
