from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route("/health")
def health():
    return jsonify({"status": "healthy", "service": "reporting-service"})

@app.route("/reports")
def business_logic():
    return jsonify({"reports": [{"id": "rpt_1", "type": "weekly", "generated_at": "2026-05-20"}]})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8103))
    app.run(host="0.0.0.0", port=port)
