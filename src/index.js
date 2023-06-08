import "./style.css";
import { addTask, removeTask, editTaskDescription } from "./taskManager";

let tasks = [];

function generateTaskList() {
  const taskList = document.getElementById("taskList");
  taskList.style.display = "flex";

  taskList.innerHTML = ""; // Limpiar la lista antes de volver a generarla

  tasks.forEach((task) => {
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
  });
}

const enter = document.getElementById("enter");
const inputText = document.getElementById("text");

enter.addEventListener("click", () => {
  const description = inputText.value;
  addTask(description);
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  generateTaskList();
  inputText.value = "";
});

window.addEventListener("DOMContentLoaded", () => {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  generateTaskList();
});
