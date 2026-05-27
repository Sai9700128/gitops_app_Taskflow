const express = require("express");
const app = express();
const PORT = process.env.PORT || 8111;

app.get("/health", (req, res) => {
  res.json({ status: "healthy", service: "notification-service" });
});

app.get("/notifications", (req, res) => {
  res.json({"notifications":[{"id":"notif_1","type":"push","message":"Task assigned","read":false}]});
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`notification-service listening on port ${PORT}`);
  });
}

module.exports = app;
