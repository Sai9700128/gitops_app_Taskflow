from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route("/health")
def health():
    return jsonify({"status": "healthy", "service": "sentiment-service"})

@app.route("/analyze")
def business_logic():
    return jsonify({"text": "sample", "sentiment": "positive", "score": 0.85})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8108))
    app.run(host="0.0.0.0", port=port)
