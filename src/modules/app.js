import localGet from './localStorage';
import structureTask from "./itemTaskStructure.js"

const taskList = document.querySelector("#taskList");
const nameTask = document.querySelector("#mainText")

const generateTaskList = () => {
  taskList.innerHTML = "";
  localGet.forEach((task, id) => {
     taskList.innerHTML += `
      <li class="item-task">
         <input type="checkbox" class="checkbox" id="check-${id}" 
         ${task.completed ? 'checked' : ''}, "completed")'>
         <input type="text" class="text" id="input-${id}" value='${task.description}' >
         <span class="material-symbols-outlined options">
          more_vert
         </span>
         <span class="material-symbols-outlined trash">delete</span>
      </li>`;
  });  
  callRotateItems();
};

const addTask = (description, completed, index) => {
  const taskAdded = new structureTask(description, completed, index);
  localGet.push(taskAdded);
  localStorage.setItem('listInMemory', JSON.stringify(localGet));
  setTimeout(() => {
    nameTask.value = '';
  }, 1000);
};

let selectedTask = null;

const rotateIcons = (event) => {
  const item = event.currentTarget;
  const trashElement = item.querySelector(".trash");
  const optionsElement = item.querySelector(".options");

  if (selectedTask && selectedTask !== item) resetIcons(selectedTask);

  trashElement.style.display = "inline";
  optionsElement.style.display = "none";
  selectedTask = item;

  console.log("rotateIcons se ejecutó");
};

const resetIcons = () => {
  document.querySelectorAll(".trash, .options").forEach(element => {
    element.style.display = element.classList.contains("trash") ? "none" : "inline";
  });
  console.log("resetIcons se ejecutó");
};


const callRotateItems = () => {
  const itemTask = Array.from(document.querySelectorAll(".item-task"));
  if (itemTask.length > 0) {
    itemTask.forEach(item => item.addEventListener("click", rotateIcons));
    document.addEventListener("click", event => {
      if (!event.target.closest(".item-task")) {
        resetIcons(selectedTask);
        selectedTask = null;
      }
    });
  }
};



export { addTask, generateTaskList, rotateIcons };