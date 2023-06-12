require('./style.css');
const { addTask, generateTaskList } = require('./modules/app.js');
const localGet = require('./modules/localStorage.js').default;

const enter = document.querySelector('.enter');
const text = document.querySelector('#mainText');

window.addEventListener('load', () => {
  generateTaskList();
});

enter.addEventListener('click', () => {
  addTask(text.value, false, localGet.length + 1);
  generateTaskList();
});
