require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");
const tasksRoutes = require("./routes/tasks");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRoutes);

app.get("/api/health", async function (req, res) {
  try {
    await pool.query("SELECT 1");

    res.json({
      status: "ok",
      message: "CodeTrack API e PostgreSQL funcionando"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Erro ao conectar ao PostgreSQL"
    });
  }
});

app.listen(PORT, function () {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});