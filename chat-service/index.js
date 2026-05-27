const express = require("express");
const app = express();
const PORT = process.env.PORT || 8112;

app.get("/health", (req, res) => {
  res.json({ status: "healthy", service: "chat-service" });
});

app.get("/messages", (req, res) => {
  res.json({"messages":[{"id":"msg_1","from":"user_1","text":"Hello team","timestamp":"2026-05-20T10:30:00Z"}]});
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`chat-service listening on port ${PORT}`);
  });
}

module.exports = app;
