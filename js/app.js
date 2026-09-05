const API_URL = "http://localhost:3000/api/tasks";

const technologyInput = document.querySelector("#technology");
const taskInput = document.querySelector("#task");
const categoryInput = document.querySelector("#category");
const priorityInput = document.querySelector("#priority");
const dueDateInput = document.querySelector("#dueDate");

const addTaskButton = document.querySelector("#addTask");
const taskList = document.querySelector("#taskList");

const levelElement = document.querySelector("#level");
const xpElement = document.querySelector("#xp");
const xpBar = document.querySelector("#xpBar");

const totalTasksElement = document.querySelector("#totalTasks");
const completedTasksElement = document.querySelector("#completedTasks");
const pendingTasksElement = document.querySelector("#pendingTasks");
const overdueTasksElement = document.querySelector("#overdueTasks");
const progressPercentageElement = document.querySelector("#progressPercentage");
const studyStreakElement = document.querySelector("#studyStreak");

const filterButtons = document.querySelectorAll(".filter-btn");

const searchInput = document.querySelector("#searchTask");
const sortSelect = document.querySelector("#sortTasks");
const categoryFilter = document.querySelector("#categoryFilter");

const productivityChart = document.querySelector("#productivityChart");
const categoryProgress = document.querySelector("#categoryProgress");

const editModal = document.querySelector("#editModal");
const editTaskName = document.querySelector("#editTaskName");
const editTechnology = document.querySelector("#editTechnology");
const editCategory = document.querySelector("#editCategory");
const editPriority = document.querySelector("#editPriority");
const editDueDate = document.querySelector("#editDueDate");

const cancelEditButton = document.querySelector("#cancelEdit");
const saveEditButton = document.querySelector("#saveEdit");

let tasks = [];
let studyDays = JSON.parse(localStorage.getItem("studyDays")) || [];

let currentFilter = "all";
let editingTaskId = null;

async function loadTasks() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Erro ao carregar tarefas.");
    }

    tasks = await response.json();

    renderTasks();
  } catch (error) {
    console.error(error);

    alert("Não foi possível conectar ao servidor.");
  }
}

async function addTask() {
  const technology = technologyInput.value.trim();
  const taskName = taskInput.value.trim();
  const category = categoryInput.value;
  const priority = priorityInput.value;
  const dueDate = dueDateInput.value;

  if (technology === "" || taskName === "") {
    alert("Preencha todos os campos.");
    return;
  }

  const newTask = {
    name: taskName,
    technology: technology,
    category: category,
    priority: priority,
    dueDate: dueDate
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(newTask)
    });

    if (!response.ok) {
      throw new Error("Erro ao criar tarefa.");
    }

    const createdTask = await response.json();

    tasks.push(createdTask);

    technologyInput.value = "";
    taskInput.value = "";
    categoryInput.value = "frontend";
    priorityInput.value = "medium";
    dueDateInput.value = "";

    renderTasks();
  } catch (error) {
    console.error(error);

    alert("Não foi possível adicionar a tarefa.");
  }
}

function isOverdue(task) {
  if (!task.dueDate || task.completed) {
    return false;
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(
    task.dueDate + "T00:00:00"
  );

  return dueDate < today;
}

function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "pending") {
    filteredTasks = tasks.filter(function(task) {
      return !task.completed;
    });
  }

  if (currentFilter === "completed") {
    filteredTasks = tasks.filter(function(task) {
      return task.completed;
    });
  }

  if (currentFilter === "overdue") {
    filteredTasks = tasks.filter(function(task) {
      return isOverdue(task);
    });
  }

  if (categoryFilter.value !== "all") {
    filteredTasks = filteredTasks.filter(function(task) {
      return (task.category || "other") === categoryFilter.value;
    });
  }

  const searchTerm = searchInput.value
    .toLowerCase()
    .trim();

  if (searchTerm !== "") {
    filteredTasks = filteredTasks.filter(function(task) {
      return (
        task.name.toLowerCase().includes(searchTerm) ||
        task.technology.toLowerCase().includes(searchTerm) ||
        (task.category || "").toLowerCase().includes(searchTerm)
      );
    });
  }

  if (sortSelect.value === "priority") {
    const priorityOrder = {
      high: 3,
      medium: 2,
      low: 1
    };

    filteredTasks = [...filteredTasks].sort(function(a, b) {
      const priorityA =
        priorityOrder[a.priority || "medium"];

      const priorityB =
        priorityOrder[b.priority || "medium"];

      return priorityB - priorityA;
    });
  }

  filteredTasks.forEach(function(task) {
    const li = document.createElement("li");

    li.classList.add("task-item");

    if (task.completed) {
      li.classList.add("completed");
    }

    const priority = task.priority || "medium";

    let priorityText = "Média";

    if (priority === "low") {
      priorityText = "Baixa";
    }

    if (priority === "high") {
      priorityText = "Alta";
    }

    let dueDateText = "Sem prazo";

    if (task.dueDate) {
      const date = new Date(
        task.dueDate + "T00:00:00"
      );

      dueDateText = date.toLocaleDateString(
        "pt-BR"
      );
    }

    let deadlineStatus = "";

    if (task.dueDate && !task.completed) {
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      const dueDate = new Date(
        task.dueDate + "T00:00:00"
      );

      if (dueDate < today) {
        deadlineStatus = "overdue";
      } else if (
        dueDate.getTime() === today.getTime()
      ) {
        deadlineStatus = "today";
      }
    }

    if (deadlineStatus === "overdue") {
      li.classList.add("overdue");
    }

    if (deadlineStatus === "today") {
      li.classList.add("due-today");
    }

    const category = task.category || "other";

    const categoryNames = {
      frontend: "Frontend",
      backend: "Backend",
      algorithms: "Algoritmos",
      git: "Git / GitHub",
      database: "Banco de Dados",
      other: "Outros"
    };

    const categoryText =
      categoryNames[category] || "Outros";

    li.innerHTML = `
      <div>
        <strong>${task.name}</strong>

        <p>
          ${task.technology} • ${categoryText}
        </p>

        <p>
          Prazo: ${dueDateText}
        </p>

        <span class="priority ${priority}">
          ${priorityText}
        </span>
      </div>

      <div>
        <button onclick="toggleTask(${task.id})">
          ${task.completed ? "Desfazer" : "Concluir"}
        </button>

        <button onclick="openEditModal(${task.id})">
          Editar
        </button>

        <button onclick="deleteTask(${task.id})">
          Excluir
        </button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateStats();
  updateDashboard();
  updateProductivityChart();
  updateCategoryProgress();
}

async function toggleTask(id) {
  const task = tasks.find(function(task) {
    return task.id === id;
  });

  if (!task) {
    return;
  }

  const completed = !task.completed;

  const completedAt = completed
    ? new Date().toISOString()
    : null;

  try {
    const response = await fetch(
      `${API_URL}/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          completed: completed,
          completedAt: completedAt
        })
      }
    );

    if (!response.ok) {
      throw new Error(
        "Erro ao atualizar tarefa."
      );
    }

    const updatedTask =
      await response.json();

    Object.assign(task, updatedTask);

    if (task.completed) {
      registerStudyDay();
    }

    renderTasks();
  } catch (error) {
    console.error(error);

    alert(
      "Não foi possível atualizar a tarefa."
    );
  }
}

async function deleteTask(id) {
  try {
    const response = await fetch(
      `${API_URL}/${id}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error(
        "Erro ao excluir tarefa."
      );
    }

    tasks = tasks.filter(function(task) {
      return task.id !== id;
    });

    renderTasks();
  } catch (error) {
    console.error(error);

    alert(
      "Não foi possível excluir a tarefa."
    );
  }
}

function openEditModal(id) {
  const task = tasks.find(function(task) {
    return task.id === id;
  });

  if (!task) {
    return;
  }

  editingTaskId = id;

  editTaskName.value = task.name;
  editTechnology.value = task.technology;
  editCategory.value =
    task.category || "other";
  editPriority.value =
    task.priority || "medium";
  editDueDate.value =
    task.dueDate || "";

  editModal.classList.add("open");
}

function closeEditModal() {
  editModal.classList.remove("open");

  editingTaskId = null;
}

async function saveEditTask() {
  const task = tasks.find(function(task) {
    return task.id === editingTaskId;
  });

  if (!task) {
    return;
  }

  const newName =
    editTaskName.value.trim();

  const newTechnology =
    editTechnology.value.trim();

  if (
    newName === "" ||
    newTechnology === ""
  ) {
    alert(
      "Nome e tecnologia não podem ficar vazios."
    );

    return;
  }

  const updatedData = {
    name: newName,
    technology: newTechnology,
    category: editCategory.value,
    priority: editPriority.value,
    dueDate: editDueDate.value
  };

  try {
    const response = await fetch(
      `${API_URL}/${editingTaskId}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(
          updatedData
        )
      }
    );

    if (!response.ok) {
      throw new Error(
        "Erro ao editar tarefa."
      );
    }

    const updatedTask =
      await response.json();

    Object.assign(
      task,
      updatedTask
    );

    renderTasks();

    closeEditModal();
  } catch (error) {
    console.error(error);

    alert(
      "Não foi possível editar a tarefa."
    );
  }
}

function updateStats() {
  const completedTasks = tasks.filter(
    function(task) {
      return task.completed;
    }
  );

  const xp =
    completedTasks.length * 20;

  const level =
    Math.floor(xp / 100) + 1;

  const xpCurrentLevel =
    xp % 100;

  levelElement.textContent =
    `Nível ${level}`;

  xpElement.textContent =
    `${xpCurrentLevel} / 100 XP`;

  xpBar.style.width =
    `${xpCurrentLevel}%`;
}

function updateDashboard() {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    function(task) {
      return task.completed;
    }
  ).length;

  const pendingTasks =
    totalTasks - completedTasks;

  const overdueTasks = tasks.filter(
    function(task) {
      return isOverdue(task);
    }
  ).length;

  let progressPercentage = 0;

  if (totalTasks > 0) {
    progressPercentage = Math.round(
      (completedTasks / totalTasks) * 100
    );
  }

  totalTasksElement.textContent =
    totalTasks;

  completedTasksElement.textContent =
    completedTasks;

  pendingTasksElement.textContent =
    pendingTasks;

  overdueTasksElement.textContent =
    overdueTasks;

  progressPercentageElement.textContent =
    `${progressPercentage}%`;

  const streak =
    calculateStreak();

  studyStreakElement.textContent =
    `${streak} ${
      streak === 1 ? "dia" : "dias"
    }`;
}

function updateCategoryProgress() {
  categoryProgress.innerHTML = "";

  const categories = {
    frontend: "Frontend",
    backend: "Backend",
    algorithms: "Algoritmos",
    git: "Git / GitHub",
    database: "Banco de Dados",
    other: "Outros"
  };

  let hasCategories = false;

  Object.entries(categories).forEach(
    function([category, name]) {
      const categoryTasks = tasks.filter(
        function(task) {
          return (
            task.category || "other"
          ) === category;
        }
      );

      if (
        categoryTasks.length === 0
      ) {
        return;
      }

      hasCategories = true;

      const completedTasks =
        categoryTasks.filter(
          function(task) {
            return task.completed;
          }
        ).length;

      const percentage = Math.round(
        (
          completedTasks /
          categoryTasks.length
        ) * 100
      );

      const item =
        document.createElement("div");

      item.classList.add(
        "category-progress-item"
      );

      item.innerHTML = `
        <div class="category-progress-info">
          <strong>${name}</strong>

          <span>
            ${completedTasks}/${categoryTasks.length}
            • ${percentage}%
          </span>
        </div>

        <div class="category-progress-bar">
          <div
            class="category-progress-fill"
            style="width: ${percentage}%"
          ></div>
        </div>
      `;

      categoryProgress.appendChild(
        item
      );
    }
  );

  if (!hasCategories) {
    categoryProgress.innerHTML = `
      <p class="empty-category">
        Adicione tarefas para visualizar seu progresso.
      </p>
    `;
  }
}

function updateProductivityChart() {
  productivityChart.innerHTML = "";

  const days = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();

    date.setHours(
      12,
      0,
      0,
      0
    );

    date.setDate(
      date.getDate() - i
    );

    const dateString =
      getDateString(date);

    const completedCount =
      tasks.filter(function(task) {
        if (!task.completedAt) {
          return false;
        }

        const completedDate =
          new Date(
            task.completedAt
          );

        return (
          getDateString(
            completedDate
          ) === dateString
        );
      }).length;

    days.push({
      date: date,
      count: completedCount
    });
  }

  const maxTasks = Math.max(
    ...days.map(function(day) {
      return day.count;
    }),
    1
  );

  days.forEach(function(day) {
    const column =
      document.createElement("div");

    column.classList.add(
      "chart-column"
    );

    const bar =
      document.createElement("div");

    bar.classList.add(
      "chart-bar"
    );

    const height =
      (day.count / maxTasks) * 100;

    bar.style.height =
      `${height}%`;

    const number =
      document.createElement("span");

    number.classList.add(
      "chart-number"
    );

    number.textContent =
      day.count;

    const label =
      document.createElement("span");

    label.classList.add(
      "chart-label"
    );

    label.textContent = day.date
      .toLocaleDateString(
        "pt-BR",
        {
          weekday: "short"
        }
      )
      .replace(".", "");

    column.appendChild(number);
    column.appendChild(bar);
    column.appendChild(label);

    productivityChart.appendChild(
      column
    );
  });
}

function getTodayDate() {
  return getDateString(
    new Date()
  );
}

function getDateString(date) {
  const year =
    date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function registerStudyDay() {
  const today =
    getTodayDate();

  if (
    !studyDays.includes(today)
  ) {
    studyDays.push(today);

    localStorage.setItem(
      "studyDays",
      JSON.stringify(studyDays)
    );
  }
}

function calculateStreak() {
  if (studyDays.length === 0) {
    return 0;
  }

  const studySet =
    new Set(studyDays);

  const today =
    new Date();

  today.setHours(
    12,
    0,
    0,
    0
  );

  let currentDate =
    new Date(today);

  const todayString =
    getDateString(
      currentDate
    );

  if (
    !studySet.has(todayString)
  ) {
    currentDate.setDate(
      currentDate.getDate() - 1
    );

    const yesterdayString =
      getDateString(
        currentDate
      );

    if (
      !studySet.has(
        yesterdayString
      )
    ) {
      return 0;
    }
  }

  let streak = 0;

  while (
    studySet.has(
      getDateString(
        currentDate
      )
    )
  ) {
    streak++;

    currentDate.setDate(
      currentDate.getDate() - 1
    );
  }

  return streak;
}

filterButtons.forEach(
  function(button) {
    button.addEventListener(
      "click",
      function() {
        currentFilter =
          button.dataset.filter;

        filterButtons.forEach(
          function(btn) {
            btn.classList.remove(
              "active"
            );
          }
        );

        button.classList.add(
          "active"
        );

        renderTasks();
      }
    );
  }
);

addTaskButton.addEventListener(
  "click",
  addTask
);

searchInput.addEventListener(
  "input",
  renderTasks
);

sortSelect.addEventListener(
  "change",
  renderTasks
);

categoryFilter.addEventListener(
  "change",
  renderTasks
);

cancelEditButton.addEventListener(
  "click",
  closeEditModal
);

saveEditButton.addEventListener(
  "click",
  saveEditTask
);

editModal.addEventListener(
  "click",
  function(event) {
    if (
      event.target === editModal
    ) {
      closeEditModal();
    }
  }
);

loadTasks();