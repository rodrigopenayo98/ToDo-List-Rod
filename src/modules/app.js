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
         <span onclick='removeTask(${id})' id='delete-${id}' class="material-symbols-outlined trash">delete</span>
      </li>`;
  });  
  callRotateItems();
};

const addTask = (description, completed, index) => {
  const taskAdded = new structureTask(description, completed, index);
  localGet.push(taskAdded);
  localStorage.setItem("listInMemory", JSON.stringify(localGet));
  setTimeout(() => {
    nameTask.value = '';
  }, 1000);
};

let selectedTask = null;

const rotateIcons = (event) => {
  const item = event.currentTarget;
  const trashElement = item.querySelector(".trash");
  const optionsElement = item.querySelector(".options");

  if (selectedTask && selectedTask !== item) {
    resetIcons(selectedTask);
  }

  trashElement.style.display = "inline";
  optionsElement.style.display = "none";
  selectedTask = item;

  item.style.border = "2px solid aquamarine";
};

const resetIcons = (item) => {
  const trashElement = item.querySelector(".trash");
  const optionsElement = item.querySelector(".options");

  trashElement.style.display = "none";
  optionsElement.style.display = "inline";
  item.style.border = "1px solid rgb(215, 214, 214)";
};

const deselectItem = () => {
  if (selectedTask) {
    resetIcons(selectedTask);
    selectedTask = null;
  }
};

const callRotateItems = () => {
  const itemTask = Array.from(document.querySelectorAll(".item-task"));
  if (itemTask.length > 0) {
    itemTask.forEach(item => {
      item.addEventListener("click", rotateIcons);
      document.addEventListener("click", event => {
        const clickedElement = event.target.closest(".item-task");
        if (!clickedElement) {
          deselectItem();
        }
      });
    });
  }
};

window.removeTask = () => {
  const trash = [...document.querySelectorAll('.trash')];
  trash.forEach((item) => {
    item.addEventListener('click', () => {
      localGet.splice(trash.indexOf(item), 1);
      localGet.forEach((item, index) => {
        item.index = index + 1;
      });
      localStorage.setItem("listInMemory", JSON.stringify(localGet));
      generateTaskList();
    });
  });
};



export { addTask, generateTaskList, rotateIcons};