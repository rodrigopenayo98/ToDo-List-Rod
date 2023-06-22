const { describe, test } = require('@jest/globals');
const { addTask } = require('./app.js');

const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

document.body.innerHTML = `
  <ul id="taskList">
    <li class="item-task">
      <button class="trash"></button>
    </li>
  </ul>
`;

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('addTask', () => {
  test('Adds a task to the list and updates localStorage', () => {
    localStorage.clear();
    addTask('Descripción de la tarea', false, 0);

    const taskList = document.getElementById('taskList');

    expect(taskList.children.length).toBe(1);

    expect(localStorage.getItem('listInMemory')).toEqual(
      JSON.stringify([
        {
          description: 'Descripción de la tarea',
          completed: false,
          index: 0,
        },
      ]),
    );
  });
});

describe('removeTask', () => {
  test('Removes a task from the list and updates localStorage', () => {
    localStorage.clear();
    addTask('Description of task 1', false, 0);
    addTask('Description of task 2', false, 1);
    addTask('Description of task 3', false, 2);

    const taskList = document.getElementById('taskList');
    const trashElement = taskList.querySelector('.trash');
    const parentElement = trashElement.parentNode;

    parentElement.dispatchEvent(new Event('click'));

    setTimeout(() => {
      const updatedTaskList = document.getElementById('taskList');
      const removedElement = updatedTaskList.querySelector('.item-task');
      expect(removedElement).toBeNull();
      expect(localStorage.getItem('listInMemory')).toEqual(
        JSON.stringify([
          {
            description: 'Description of task 1',
            completed: false,
            index: 0,
          },
          {
            description: 'Description of task 3',
            completed: false,
            index: 1,
          },
        ]),
      );
    }, 0);
  });
});

// updateDescription.test.js

import { updateDescription , updateCompleted, clearCompletedTasks } from './otherFunctions.js';

describe('updateDescription', () => {
  it('should update the description of an element in localGet', () => {
    const localGet = [
      { index: 0, description: 'Descripción anterior', completed: false },
    ];

    const updatedLocalGet = updateDescription(localGet, 0, 'Nueva descripción');

    expect(updatedLocalGet).toEqual([
      { index: 0, description: 'Nueva descripción', completed: false },
    ]);
  });
});

describe('updateCompleted', () => {
  it('should update the completed state of a task in localGet', () => {
    const localGet = [
      { index: 0, description: 'Task 1', completed: false },
      { index: 1, description: 'Task 2', completed: false },
    ];

    const updatedLocalGet = updateCompleted(localGet, 1, true);

    expect(updatedLocalGet).toEqual([
      { index: 0, description: 'Task 1', completed: false },
      { index: 1, description: 'Task 2', completed: true },
    ]);
  });
});







