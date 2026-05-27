from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route("/health")
def health():
    return jsonify({"status": "healthy", "service": "search-service"})

@app.route("/search")
def business_logic():
    return jsonify({"results": [{"id": "doc_1", "title": "Getting Started", "score": 0.95}]})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8104))
    app.run(host="0.0.0.0", port=port)
