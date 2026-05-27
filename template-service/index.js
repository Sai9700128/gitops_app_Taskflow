const express = require("express");
const app = express();
const PORT = process.env.PORT || 8114;

app.get("/health", (req, res) => {
  res.json({ status: "healthy", service: "template-service" });
});

app.get("/templates", (req, res) => {
  res.json({"templates":[{"id":"tpl_1","name":"welcome_email","vars":["username","company"]}]});
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`template-service listening on port ${PORT}`);
  });
}

module.exports = app;
