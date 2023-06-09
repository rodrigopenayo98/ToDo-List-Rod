import { tasks } from "./index"

export function renderTaskList() {
  const taskList = document.getElementById("taskList");
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

    elementList.appendChild(checkbox);
    elementList.appendChild(description);

    if (task.completed) {
      elementList.classList.add("completed");
    }

    taskList.appendChild(elementList);
  });
}
