const technologyInput = document.querySelector("#technology");
const taskInput = document.querySelector("#task");
const addTaskButton = document.querySelector("#addTask");
const taskList = document.querySelector("#taskList");


const levelElement = document.querySelector("#level");
const xpElement = document.querySelector("#xp");
const xpBar = document.querySelector("#xpBar");


const totalTasksElement = document.querySelector("#totalTasks");
const completedTasksElement = document.querySelector("#completedTasks");
const pendingTasksElement = document.querySelector("#pendingTasks");
const progressPercentageElement = document.querySelector("#progressPercentage");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
  const technology = technologyInput.value;
  const taskName = taskInput.value;

  if (technology === "" || taskName === "") {
    alert("Preencha todos os campos.");
    return;
  }

  const newTask = {
    id: Date.now(),
    technology: technology,
    name: taskName,
    completed: false
  };

  tasks.push(newTask);

  saveTasks();
  renderTasks();

  technologyInput.value = "";
  taskInput.value = "";
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function(task) {
    const li = document.createElement("li");

    li.classList.add("task-item");

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <div>
        <strong>${task.name}</strong>
        <p>${task.technology}</p>
      </div>

      <div>
        <button onclick="toggleTask(${task.id})">
          ${task.completed ? "Desfazer" : "Concluir"}
        </button>

        <button onclick="deleteTask(${task.id})">
          Excluir
        </button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateStats();
}

function toggleTask(id) {
  const task = tasks.find(function(task) {
    return task.id === id;
  });

  task.completed = !task.completed;

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
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskButton.addEventListener("click", addTask);

renderTasks();

function updateStats() {
  const completedTasks = tasks.filter(function(task) {
    return task.completed;
  });

  const xp = completedTasks.length * 20;

  const level = Math.floor(xp / 100) + 1;

  const xpCurrentLevel = xp % 100;

  levelElement.textContent = `Nível ${level}`;

  xpElement.textContent = `${xpCurrentLevel} / 100 XP`;

  xpBar.style.width = `${xpCurrentLevel}%`;
}

function updateDashboard() {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(function(task) {
    return task.completed;
  }).length;

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