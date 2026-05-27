from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route("/health")
def health():
    return jsonify({"status": "healthy", "service": "ml-inference-service"})

@app.route("/predict")
def business_logic():
    return jsonify({"prediction": "high_priority", "confidence": 0.92, "model_version": "v2.1"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8106))
    app.run(host="0.0.0.0", port=port)
