import "./style.css";

const tasks = [
  { description: "Tarea 1", completed: false, index: 1 },
  { description: "Tarea 2", completed: true, index: 2 },
  { description: "Tarea 3", completed: false, index: 3 },
];

function generateTaskList() {
  const taskList = document.getElementById("taskList");
  taskList.style.display = "flex";

  for (let task of tasks) {
    const elementList = document.createElement("li");
    elementList.classList.add("item-task");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      elementList.classList.toggle("completed");
    });

    const description = document.createElement("span");
    description.textContent = task.description;
    description.classList.add("task-name");

    const icon = document.createElement("span");
    icon.classList.add("material-symbols-outlined");
    icon.textContent = "more_vert";

    elementList.appendChild(checkbox);
    elementList.appendChild(description);
    elementList.appendChild(icon);

    if (task.completed) {
      elementList.classList.add("completed");
    }

    taskList.appendChild(elementList);
  }
}




window.addEventListener("DOMContentLoaded", generateTaskList);

