from flask import render_template
from app import app


@app.route("/", methods=["GET"], defaults={"path": ""})
@app.route("/<path:path>", methods=["GET"])
def index(path):
    return render_template("/static/dist/index.html", active_page=f"/{path}")
