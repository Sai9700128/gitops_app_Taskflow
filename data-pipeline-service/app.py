from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route("/health")
def health():
    return jsonify({"status": "healthy", "service": "data-pipeline-service"})

@app.route("/pipelines")
def business_logic():
    return jsonify({"pipelines": [{"id": "pl_1", "stage": "transform", "progress_pct": 67}]})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8107))
    app.run(host="0.0.0.0", port=port)
