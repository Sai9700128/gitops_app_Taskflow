const express = require("express");
const app = express();
const PORT = process.env.PORT || 8116;

app.get("/health", (req, res) => {
  res.json({ status: "healthy", service: "activity-feed-service" });
});

app.get("/feed", (req, res) => {
  res.json({"feed":[{"actor":"alice","action":"completed","target":"task_42"}]});
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`activity-feed-service listening on port ${PORT}`);
  });
}

module.exports = app;
