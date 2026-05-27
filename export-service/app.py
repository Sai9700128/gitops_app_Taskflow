from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route("/health")
def health():
    return jsonify({"status": "healthy", "service": "export-service"})

@app.route("/exports")
def business_logic():
    return jsonify({"exports": [{"id": "exp_1", "format": "csv", "status": "ready", "rows": 15000}]})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8109))
    app.run(host="0.0.0.0", port=port)
