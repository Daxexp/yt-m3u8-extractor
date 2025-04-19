
from flask import Flask, request, jsonify, render_template
import yt_dlp
import uuid

app = Flask(__name__)
shared_links = {}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/extract", methods=["POST"])
def extract():
    url = request.json.get("url")
    if not url or "youtube.com" not in url:
        return jsonify({"error": "Invalid YouTube URL"}), 400

    try:
        ydl_opts = {"quiet": True, "skip_download": True, "forcejson": True, "simulate": True}
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
        return jsonify({"success": True, "info": info})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/share", methods=["POST"])
def share():
    url = request.json.get("url")
    key = str(uuid.uuid4())[:8]
    shared_links[key] = url
    return jsonify({"share_url": f"/view/{key}"})

@app.route("/view/<key>")
def view_shared(key):
    url = shared_links.get(key)
    return render_template("index.html", shared_url=url)

if __name__ == "__main__":
    app.run(debug=True)
