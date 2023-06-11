import './style.css';
import { addTask , generateTaskList, rotateIcons } from './modules/app';
import localGet from './modules/localStorage';

const enter = document.querySelector(".enter");
const text = document.querySelector("#mainText");

window.addEventListener("load", () =>{
  generateTaskList();
})

enter.addEventListener("click", () => {
  addTask(text.value, false, localGet.length + 1);
  generateTaskList();
});


window.onload = () => {
  const itemTask = document.querySelector(".item-task");
  console.log(itemTask);
  if (itemTask) {
    itemTask.addEventListener("click", rotateIcons);
    console.log("si existe");
  }
};

  



// const tasks = [
//   { description: 'Do Exercise', completed: false, index: 1 },
//   { description: 'Finish All Microverse Projects', completed: true, index: 2 },
//   { description: 'Practice Guitar', completed: false, index: 3 },
// ];

// function generateTaskList() {
//   const taskList = document.getElementById('taskList');
//   taskList.style.display = 'flex';

//   tasks.forEach((task) => {
//     const elementList = document.createElement('li');
//     elementList.classList.add('item-task');

//     const checkbox = document.createElement('input');
//     checkbox.type = 'checkbox';
//     checkbox.classList.add('checkbox');
//     checkbox.checked = task.completed;
//     checkbox.addEventListener('change', () => {
//       task.completed = checkbox.checked;
//       elementList.classList.toggle('completed');
//     });

//     const description = document.createElement('span');
//     description.textContent = task.description;
//     description.classList.add('task-name');

//     const icon = document.createElement('span');
//     icon.classList.add('material-symbols-outlined');
//     icon.textContent = 'more_vert';

//     elementList.appendChild(checkbox);
//     elementList.appendChild(description);
//     elementList.appendChild(icon);

//     if (task.completed) {
//       elementList.classList.add('completed');
//     }

//     taskList.appendChild(elementList);
//   });
// }

// window.addEventListener('DOMContentLoaded', generateTaskList);
