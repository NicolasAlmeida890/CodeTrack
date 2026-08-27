const technologyInput = document.querySelector("#technology");
const taskInput = document.querySelector("#task");
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
const progressPercentageElement = document.querySelector("#progressPercentage");

const filterButtons = document.querySelectorAll(".filter-btn");

const searchInput = document.querySelector("#searchTask");
const sortSelect = document.querySelector("#sortTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function addTask() {
  const technology = technologyInput.value.trim();
  const taskName = taskInput.value.trim();
  const priority = priorityInput.value;
  const dueDate = dueDateInput.value;

  if (technology === "" || taskName === "") {
    alert("Preencha todos os campos.");
    return;
  }

  const newTask = {
    id: Date.now(),
    technology: technology,
    name: taskName,
    priority: priority,
    dueDate: dueDate,
    completed: false
  };

  tasks.push(newTask);

  saveTasks();
  renderTasks();

  technologyInput.value = "";
  taskInput.value = "";
  priorityInput.value = "medium";
  dueDateInput.value = "";
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

  const searchTerm = searchInput.value
    .toLowerCase()
    .trim();

  if (searchTerm !== "") {
    filteredTasks = filteredTasks.filter(function(task) {
      return (
        task.name.toLowerCase().includes(searchTerm) ||
        task.technology.toLowerCase().includes(searchTerm)
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
      const priorityA = priorityOrder[a.priority || "medium"];
      const priorityB = priorityOrder[b.priority || "medium"];

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
      const date = new Date(task.dueDate + "T00:00:00");

      dueDateText = date.toLocaleDateString("pt-BR");
    }

    let deadlineStatus = "";

    if (task.dueDate && !task.completed) {
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      const dueDate = new Date(task.dueDate + "T00:00:00");

      if (dueDate < today) {
        deadlineStatus = "overdue";
      } else if (dueDate.getTime() === today.getTime()) {
        deadlineStatus = "today";
      }
    }

    if (deadlineStatus === "overdue") {
      li.classList.add("overdue");
    }

    if (deadlineStatus === "today") {
      li.classList.add("due-today");
    }

    li.innerHTML = `
      <div>
        <strong>${task.name}</strong>

        <p>${task.technology}</p>

        <p>Prazo: ${dueDateText}</p>

        <span class="priority ${priority}">
          ${priorityText}
        </span>
      </div>

      <div>
        <button onclick="toggleTask(${task.id})">
          ${task.completed ? "Desfazer" : "Concluir"}
        </button>

        <button onclick="editTask(${task.id})">
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
}

function toggleTask(id) {
  const task = tasks.find(function(task) {
    return task.id === id;
  });

  if (!task) {
    return;
  }

  task.completed = !task.completed;

  saveTasks();
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(function(task) {
    return task.id === id;
  });

  if (!task) {
    return;
  }

  const newName = prompt(
    "Digite o novo nome da tarefa:",
    task.name
  );

  if (newName === null) {
    return;
  }

  const newTechnology = prompt(
    "Digite a nova tecnologia:",
    task.technology
  );

  if (newTechnology === null) {
    return;
  }

  const currentPriority = task.priority || "medium";

  const newPriority = prompt(
    "Digite a prioridade: low, medium ou high",
    currentPriority
  );

  if (newPriority === null) {
    return;
  }

  const newDueDate = prompt(
    "Digite o novo prazo no formato AAAA-MM-DD:",
    task.dueDate || ""
  );

  if (newDueDate === null) {
    return;
  }

  const priority = newPriority.toLowerCase().trim();

  if (
    newName.trim() === "" ||
    newTechnology.trim() === ""
  ) {
    alert("Os campos não podem ficar vazios.");
    return;
  }

  if (
    priority !== "low" &&
    priority !== "medium" &&
    priority !== "high"
  ) {
    alert("Prioridade inválida. Use low, medium ou high.");
    return;
  }

  task.name = newName.trim();
  task.technology = newTechnology.trim();
  task.priority = priority;
  task.dueDate = newDueDate.trim();

  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(function(task) {
    return task.id !== id;
  });

  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
}

function updateStats() {
  const completedTasks = tasks.filter(
    function(task) {
      return task.completed;
    }
  );

  const xp = completedTasks.length * 20;

  const level = Math.floor(xp / 100) + 1;

  const xpCurrentLevel = xp % 100;

  levelElement.textContent = `Nível ${level}`;

  xpElement.textContent = `${xpCurrentLevel} / 100 XP`;

  xpBar.style.width = `${xpCurrentLevel}%`;
}

function updateDashboard() {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    function(task) {
      return task.completed;
    }
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  let progressPercentage = 0;

  if (totalTasks > 0) {
    progressPercentage = Math.round(
      (completedTasks / totalTasks) * 100
    );
  }

  totalTasksElement.textContent = totalTasks;
  completedTasksElement.textContent = completedTasks;
  pendingTasksElement.textContent = pendingTasks;
  progressPercentageElement.textContent = `${progressPercentage}%`;
}

filterButtons.forEach(function(button) {
  button.addEventListener(
    "click",
    function() {
      currentFilter = button.dataset.filter;

      filterButtons.forEach(
        function(btn) {
          btn.classList.remove("active");
        }
      );

      button.classList.add("active");

      renderTasks();
    }
  );
});

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

renderTasks();