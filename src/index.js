import "./style.css";

// Array de tareas
const tasks = [
  { description: "Tarea 1", completed: false, index: 1 },
  { description: "Tarea 2", completed: true, index: 2 },
  { description: "Tarea 3", completed: false, index: 3 },
];

// Función para generar la lista de tareas en HTML
function generateTaskList() {
  const taskList = document.getElementById("taskList"); // Marcador de posición en el HTML
  
  // Cambiar el valor de display del elemento <ul> a "flex"
  taskList.style.display = "flex";
  
  // Iterar sobre la matriz de tareas
  for (let task of tasks) {
    // Crear un elemento de lista <li>
    const elementList = document.createElement("li");
    
    // Establecer el texto de la descripción de la tarea como contenido del elemento de lista
    elementList.textContent = task.description;
    
    // Agregar una clase al elemento de lista según el estado de completado de la tarea
    if (task.completed) {
      elementList.classList.add("completada");
    }
    
    // Agregar el elemento de lista a la lista de tareas
    taskList.appendChild(elementList);
  }
}

// Llamar a la función para generar la lista de tareas al cargar la página
window.addEventListener("DOMContentLoaded", generateTaskList);

