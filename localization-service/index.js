const express = require("express");
const app = express();
const PORT = process.env.PORT || 8119;

app.get("/health", (req, res) => {
  res.json({ status: "healthy", service: "localization-service" });
});

app.get("/locales", (req, res) => {
  res.json({"supported":["en","es","fr","de","ja"],"default":"en"});
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`localization-service listening on port ${PORT}`);
  });
}

module.exports = app;
