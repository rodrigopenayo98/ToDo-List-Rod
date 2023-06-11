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
};

const addTask = (description, completed, index) => {
  const taskAdded = new structureTask(description, completed, index);
  localGet.push(taskAdded);
  localStorage.setItem('listInMemory', JSON.stringify(localGet));
  setTimeout(() => {
    nameTask.value = '';
  }, 1000);
};

const rotateIcons = () => {
  const trashElement = document.querySelector(".trash");
  const optionsElement = document.querySelector(".options");

  trashElement.style.display = "inline";
  optionsElement.style.display = "none";
  console.log("rotateIcons se ejecutó");
};

export { addTask, generateTaskList, rotateIcons };