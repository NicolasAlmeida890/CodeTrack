const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tasks = [];

app.get("/api/health", function(req, res) {
  res.json({
    status: "ok",
    message: "CodeTrack API funcionando"
  });
});

app.get("/api/tasks", function(req, res) {
  res.json(tasks);
});

app.post("/api/tasks", function(req, res) {
  const newTask = {
    id: Date.now(),
    name: req.body.name,
    technology: req.body.technology,
    category: req.body.category,
    priority: req.body.priority,
    dueDate: req.body.dueDate,
    completed: false,
    completedAt: null
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

app.put("/api/tasks/:id", function(req, res) {
  const id = Number(req.params.id);

  const task = tasks.find(function(task) {
    return task.id === id;
  });

  if (!task) {
    return res.status(404).json({
      message: "Tarefa não encontrada"
    });
  }

  task.name = req.body.name ?? task.name;
  task.technology = req.body.technology ?? task.technology;
  task.category = req.body.category ?? task.category;
  task.priority = req.body.priority ?? task.priority;
  task.dueDate = req.body.dueDate ?? task.dueDate;
  task.completed = req.body.completed ?? task.completed;

  if ("completedAt" in req.body) {
    task.completedAt = req.body.completedAt;
  }

  res.json(task);
});

app.delete("/api/tasks/:id", function(req, res) {
  const id = Number(req.params.id);

  const taskExists = tasks.some(function(task) {
    return task.id === id;
  });

  if (!taskExists) {
    return res.status(404).json({
      message: "Tarefa não encontrada"
    });
  }

  tasks = tasks.filter(function(task) {
    return task.id !== id;
  });

  res.status(204).send();
});

app.listen(PORT, function() {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});