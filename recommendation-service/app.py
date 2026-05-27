from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route("/health")
def health():
    return jsonify({"status": "healthy", "service": "recommendation-service"})

@app.route("/recommendations")
def business_logic():
    return jsonify({"items": [{"id": "task_42", "reason": "similar to completed tasks", "confidence": 0.87}]})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8105))
    app.run(host="0.0.0.0", port=port)
