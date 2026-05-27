const express = require("express");
const app = express();
const PORT = process.env.PORT || 8118;

app.get("/health", (req, res) => {
  res.json({ status: "healthy", service: "markdown-service" });
});

app.get("/render", (req, res) => {
  res.json({"input":"# Hello","output":"<h1>Hello</h1>"});
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`markdown-service listening on port ${PORT}`);
  });
}

module.exports = app;
