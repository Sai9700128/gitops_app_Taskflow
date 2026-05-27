const express = require("express");
const app = express();
const PORT = process.env.PORT || 8117;

app.get("/health", (req, res) => {
  res.json({ status: "healthy", service: "realtime-service" });
});

app.get("/connections", (req, res) => {
  res.json({"active_connections":142,"channels":["tasks","chat","notifications"]});
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`realtime-service listening on port ${PORT}`);
  });
}

module.exports = app;
