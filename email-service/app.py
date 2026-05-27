from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route("/health")
def health():
    return jsonify({"status": "healthy", "service": "email-service"})

@app.route("/emails")
def business_logic():
    return jsonify({"sent": [{"to": "user@example.com", "subject": "Welcome", "status": "delivered"}]})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8101))
    app.run(host="0.0.0.0", port=port)
