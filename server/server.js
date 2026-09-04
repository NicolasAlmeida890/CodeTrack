const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", function(req, res) {
  res.json({
    status: "ok",
    message: "CodeTrack API funcionando"
  });
});

app.listen(PORT, function() {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});