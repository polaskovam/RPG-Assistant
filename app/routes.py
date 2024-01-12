import os
from dotenv import load_dotenv
from flask import Flask, render_template, redirect, url_for, flash, request, abort
from flask_bootstrap import Bootstrap
from functools import wraps
from app import app


@app.route("/", methods=["GET"], defaults={"path": ""})
@app.route("/<path:path>", methods=["GET"])
def index(path):
    return render_template("/static/build/index.html", active_page=f"/{path}")
