import './style.css';
import { addTask, generateTaskList } from './modules/app.js';
import localGet from './modules/localStorage.js';
import clearAllCompleted from './modules/clearAllCompleted.js';

const enter = document.querySelector('.enter');
const text = document.querySelector('#mainText');
const btnClear = document.querySelector('#btn-clear');

window.addEventListener('load', () => {
  generateTaskList();
});

enter.addEventListener('click', () => {
  addTask(text.value, false, localGet.length + 1);
  generateTaskList();
});

btnClear.addEventListener('click', () => {
  clearAllCompleted();
  generateTaskList();
});
