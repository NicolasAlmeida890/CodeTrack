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

    li.innerHTML = `
      <strong>${task.name}</strong>
      <p>${task.technology}</p>
    `;

    taskList.appendChild(li);
  });
}

addTaskButton.addEventListener("click", addTask);