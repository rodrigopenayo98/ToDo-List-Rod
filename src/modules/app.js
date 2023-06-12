import localGet from './localStorage';
import structureTask from "./itemTaskStructure.js"

const taskList = document.querySelector("#taskList");
const nameTask = document.querySelector("#mainText")

const generateTaskList = () => {
  taskList.innerHTML = "";
  localGet.forEach((task, id) => {
     taskList.innerHTML += `
      <li class="item-task">
         <input type="checkbox" class="checkbox" id="check-${id}"         onchange="updateDescrip(${id})" ${task.completed ? 'checked' : ''}>
         <input type="text" class="text" id="input-${id}" value="${task.description}" onchange="updateDescrip(${id})">
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
  taskList.addEventListener('click', (event) => {
    const trashElement = event.target.closest('.trash');
    if (trashElement) {
      const id = trashElement.id.split('-')[1];
      const index = Array.from(taskList.children).indexOf(trashElement.parentNode);
      if (index !== -1) {
        localGet.splice(index, 1);
        localGet.forEach((task, index) => {
          task.index = index + 1;
        });
        localStorage.setItem("listInMemory", JSON.stringify(localGet));
        generateTaskList();
      }
    }
  });
};


window.updateDescrip = (id) => {
  const updateInput = document.querySelector(`#input-${id}`).value;
  const updateCheckbox = document.querySelector(`#check-${id}`).checked;
  
  localGet.forEach((item) => {
    if (item.index - 1 === id) {
      item.description = updateInput;
      item.completed = updateCheckbox;
    }
  });
  
  localStorage.setItem('listInMemory', JSON.stringify(localGet));
};




export { addTask, generateTaskList, rotateIcons};