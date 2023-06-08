export function addTask(description) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const newTask = {
    description: description, 
    completed: false, 
    index: tasks.length + 1,
  };

  tasks.push(newTask);

  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export function removeTask(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(index - 1, 1); 

  for (let i = index - 1; i < tasks.length; i++) {
    tasks[i].index = i + 1;
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export function editTaskDescription(index, newDescription) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach((task) => {
    if (task.index === index) {
      task.description = newDescription;
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
};


