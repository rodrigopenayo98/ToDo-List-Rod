import { generateTaskList } from "./index";
import { renderTaskList } from "./render";

export function addTask(description) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const newTask = {
    description: description,
    completed: false,
    index: tasks.length + 1,
  };

  tasks.push(newTask);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function removeTask(index, elementList) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (index >= 1 && index <= tasks.length) {
    tasks.splice(index - 1, 1);
    updateTaskIndices(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    elementList.remove();
    location.reload(); // Actualizar la página de forma discreta
  }
}


function updateTaskIndices(tasks) {
  for (let i = 0; i < tasks.length; i++) {
    tasks[i].index = i + 1;
  }
}

export function changeToIcon(item) {
  const options = item.querySelector(".options");
  const trash = item.querySelector(".trash");

  if (item.classList.contains("active")) {
    item.classList.remove("active");
    options.style.display = "inline";
    trash.style.display = "none";
  } else {
    item.classList.add("active");
    options.style.display = "none";
    trash.style.display = "inline";
  }
}

export function editTaskDescription(taskIndex, newDescription) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (taskIndex >= 0 && taskIndex < tasks.length) {
    tasks[taskIndex].description = newDescription;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

export function handleTaskNameInput(event) {
  const taskNameInput = event.target;
  const taskItem = taskNameInput.closest(".item-task");
  const index = Array.from(taskItem.parentNode.children).indexOf(taskItem);
  const newDescription = taskNameInput.value;
  editTaskDescription(index, newDescription);
}  

export function removeCompletedTasks(tasks) {
  const filteredTasks = tasks.filter(task => !task.completed);
  console.log(filteredTasks);
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));

  generateTaskList();
  
}






