const technologyInput = document.querySelector("#technology");
const taskInput = document.querySelector("#task");
const addTaskButton = document.querySelector("#addTask");
const taskList = document.querySelector("#taskList");

let tasks = [];

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
}

function toggleTask(id) {
  const task = tasks.find(function(task) {
    return task.id === id;
  });

  task.completed = !task.completed;

  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(function(task) {
    return task.id !== id;
  });

  renderTasks();
}

addTaskButton.addEventListener("click", addTask);