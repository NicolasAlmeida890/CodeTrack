require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT)
});

app.get("/api/health", async function(req, res) {
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

app.get("/api/tasks", async function(req, res) {
  try {
    const result = await pool.query(
      `
        SELECT
          id,
          name,
          technology,
          category,
          priority,
          due_date AS "dueDate",
          completed,
          completed_at AS "completedAt"
        FROM tasks
        ORDER BY id DESC
      `
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erro ao buscar tarefas"
    });
  }
});

app.post("/api/tasks", async function(req, res) {
  try {
    const {
      name,
      technology,
      category,
      priority,
      dueDate
    } = req.body;

    const result = await pool.query(
      `
        INSERT INTO tasks (
          name,
          technology,
          category,
          priority,
          due_date,
          completed,
          completed_at
        )
        VALUES ($1, $2, $3, $4, $5, FALSE, NULL)
        RETURNING
          id,
          name,
          technology,
          category,
          priority,
          due_date AS "dueDate",
          completed,
          completed_at AS "completedAt"
      `,
      [
        name,
        technology,
        category,
        priority,
        dueDate || null
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erro ao criar tarefa"
    });
  }
});

app.put("/api/tasks/:id", async function(req, res) {
  try {
    const id = Number(req.params.id);

    const currentTaskResult = await pool.query(
      "SELECT * FROM tasks WHERE id = $1",
      [id]
    );

    if (currentTaskResult.rows.length === 0) {
      return res.status(404).json({
        message: "Tarefa não encontrada"
      });
    }

    const currentTask = currentTaskResult.rows[0];

    const name =
      req.body.name ?? currentTask.name;

    const technology =
      req.body.technology ?? currentTask.technology;

    const category =
      req.body.category ?? currentTask.category;

    const priority =
      req.body.priority ?? currentTask.priority;

    const dueDate =
      "dueDate" in req.body
        ? req.body.dueDate || null
        : currentTask.due_date;

    const completed =
      req.body.completed ?? currentTask.completed;

    const completedAt =
      "completedAt" in req.body
        ? req.body.completedAt
        : currentTask.completed_at;

    const result = await pool.query(
      `
        UPDATE tasks
        SET
          name = $1,
          technology = $2,
          category = $3,
          priority = $4,
          due_date = $5,
          completed = $6,
          completed_at = $7
        WHERE id = $8
        RETURNING
          id,
          name,
          technology,
          category,
          priority,
          due_date AS "dueDate",
          completed,
          completed_at AS "completedAt"
      `,
      [
        name,
        technology,
        category,
        priority,
        dueDate,
        completed,
        completedAt,
        id
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erro ao atualizar tarefa"
    });
  }
});

app.delete("/api/tasks/:id", async function(req, res) {
  try {
    const id = Number(req.params.id);

    const result = await pool.query(
      `
        DELETE FROM tasks
        WHERE id = $1
        RETURNING id
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Tarefa não encontrada"
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erro ao excluir tarefa"
    });
  }
});

app.listen(PORT, function() {
  console.log(
    `Servidor rodando em http://localhost:${PORT}`
  );
});