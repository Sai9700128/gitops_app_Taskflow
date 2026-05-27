from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route("/health")
def health():
    return jsonify({"status": "healthy", "service": "geo-service"})

@app.route("/geocode")
def business_logic():
    return jsonify({"lat": 42.3601, "lng": -71.0589, "city": "Boston", "state": "MA"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8110))
    app.run(host="0.0.0.0", port=port)
