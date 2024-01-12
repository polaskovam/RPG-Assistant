from flask import render_template, redirect, url_for, jsonify
from app import app


@app.errorhandler(401)
def unauthorised(e):
    return jsonify({"error": "Unauthorized"}), 401


@app.errorhandler(403)
def forbidden(e):
    return jsonify({"error": "Forbidden"}), 403


@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Not Found"}), 404
