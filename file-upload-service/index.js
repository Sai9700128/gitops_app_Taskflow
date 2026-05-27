const express = require("express");
const app = express();
const PORT = process.env.PORT || 8113;

app.get("/health", (req, res) => {
  res.json({ status: "healthy", service: "file-upload-service" });
});

app.get("/files", (req, res) => {
  res.json({"files":[{"id":"file_1","name":"report.pdf","size_kb":2048}]});
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`file-upload-service listening on port ${PORT}`);
  });
}

module.exports = app;
