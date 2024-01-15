import os
from dotenv import load_dotenv
from flask import Flask
from flask_bootstrap import Bootstrap
from flask_cors import CORS

# INIT APP
load_dotenv()
app = Flask(__name__, template_folder="./")
app.debug = True
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
app.config['CORS_HEADERS'] = 'Content-Type'

# LOGIN MANAGER
cors = CORS(app, supports_credentials=True, resources={r"/foo": {"origins": "http://localhost:port"}})
bootstrap = Bootstrap(app)

from app import routes
