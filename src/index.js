import "./style.css";
import { addTask, changeToIcon, handleTaskNameInput, removeTask, removeCompletedTasks } from "./taskManager";
import { renderTaskList } from "./render";

export let tasks = [];

export function generateTaskList() {
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

    const description = document.createElement("input");
    description.type = "text";
    description.value = task.description;
    description.classList.add("task-name");
    description.addEventListener("input", (event) => {
      const newDescription = event.target.value;
      const taskIndex = tasks.findIndex((t) => t.index === task.index);
      tasks[taskIndex].description = newDescription;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    const icon = document.createElement("span");
    icon.classList.add("material-symbols-outlined");
    icon.classList.add("options");
    icon.textContent = "more_vert";

    const icon2 = document.createElement("span");
    icon2.classList.add("material-symbols-outlined");
    icon2.classList.add("trash");
    icon2.textContent = "delete";
    icon2.addEventListener("click", () => {
      removeTask(task.index, elementList);
    });
    icon2.style.display = "none"; // Ocultar el icono

    elementList.appendChild(checkbox);
    elementList.appendChild(description);
    elementList.appendChild(icon);
    elementList.appendChild(icon2);

    if (task.completed) {
      elementList.classList.add("completed");
    }
    taskList.appendChild(elementList);
    const checkbox1 = document.querySelectorAll(".checkbox") 
    checkbox1.forEach((checkbox) => 
    { checkbox.addEventListener('change', (event) => {
      const currentState = event.target.checked;
      let previousState = checkbox.checked;
      console.log(currentState);
      
      if (currentState !== previousState) {
        tasks.forEach((task) => {
          if (task.description === inputText.value) {
            task.completed = currentState;
          }
        });
        storeLocalStorage(tasks);
      }
      previousState = currentState;
    });})
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

document.addEventListener("click", (event) => {
  const target = event.target;
  const item = target.closest(".item-task");
  const items = document.querySelectorAll(".item-task");

  if (!item) {
    items.forEach((item) => {
      const options = item.querySelector(".options");
      const trash = item.querySelector(".trash");
      item.classList.remove("active");
  
      // Verificar si el elemento existe antes de acceder a la propiedad style
      if (options) {
        options.style.display = "inline";
      }
      if (trash) {
        trash.style.display = "none";
      }
    });
  } else {
    items.forEach((otherItem) => {
      if (otherItem !== item) {
        const options = otherItem.querySelector(".options");
        const trash = otherItem.querySelector(".trash");
        otherItem.classList.remove("active");
  
        // Verificar si el elemento existe antes de acceder a la propiedad style
        if (options) {
          options.style.display = "inline";
        }
        if (trash) {
          trash.style.display = "none";
        }
      }
    });
    changeToIcon(item);
  }
  
});
console.log("-----------1");

const btnClear = document.getElementById("btn-clear");
btnClear.addEventListener("click", removeCompletedTasks(tasks));

window.removeTask = removeTask;
window.generateTaskList = generateTaskList;