from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route("/health")
def health():
    return jsonify({"status": "healthy", "service": "analytics-service"})

@app.route("/analytics")
def business_logic():
    return jsonify({"daily_active_users": 1523, "page_views": 45200, "avg_session_min": 8.3})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8102))
    app.run(host="0.0.0.0", port=port)
