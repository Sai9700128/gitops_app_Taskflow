const express = require("express");
const app = express();
const PORT = process.env.PORT || 8115;

app.get("/health", (req, res) => {
  res.json({ status: "healthy", service: "comment-service" });
});

app.get("/comments", (req, res) => {
  res.json({"comments":[{"id":"cmt_1","author":"alice","text":"Looks good!","task_id":"task_42"}]});
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`comment-service listening on port ${PORT}`);
  });
}

module.exports = app;
