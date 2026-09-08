const pool = require("../db");

async function getTasks(req, res) {
  try {
    const result = await pool.query(`
      SELECT
        id::int AS id,
        name,
        technology,
        category,
        priority,
        TO_CHAR(due_date, 'YYYY-MM-DD') AS "dueDate",
        completed,
        completed_at AS "completedAt"
      FROM tasks
      ORDER BY id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erro ao buscar tarefas"
    });
  }
}

async function createTask(req, res) {
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
          id::int AS id,
          name,
          technology,
          category,
          priority,
          TO_CHAR(due_date, 'YYYY-MM-DD') AS "dueDate",
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
}

async function updateTask(req, res) {
  try {
    const id = Number(req.params.id);

    const currentTaskResult = await pool.query(
      `
        SELECT
          id,
          name,
          technology,
          category,
          priority,
          due_date,
          completed,
          completed_at
        FROM tasks
        WHERE id = $1
      `,
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
          id::int AS id,
          name,
          technology,
          category,
          priority,
          TO_CHAR(due_date, 'YYYY-MM-DD') AS "dueDate",
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
}

async function deleteTask(req, res) {
  try {
    const id = Number(req.params.id);

    const result = await pool.query(
      `
        DELETE FROM tasks
        WHERE id = $1
        RETURNING id::int AS id
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
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};