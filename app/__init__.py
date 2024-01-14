import os
from dotenv import load_dotenv
from flask import Flask, render_template, redirect, url_for, flash, request, abort
from flask_bootstrap import Bootstrap
from flask_cors import CORS

# -------------------- INIT APP --------------------
load_dotenv()
app = Flask(__name__, template_folder="./")
app.debug = True
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
app.config['CORS_HEADERS'] = 'Content-Type'
# app.config['SESSION_COOKIE_SAMESITE'] = "None"


# LOGIN MANAGER
cors = CORS(app, supports_credentials=True, resources={r"/foo": {"origins": "http://localhost:port"}})
bootstrap = Bootstrap(app)
# bootstrap.init_app(app)

from app import routes
