export function addTask(description) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const newTask = {
    description: description,
    completed: false,
    index: tasks.length + 1,
  };

  tasks.push(newTask);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function removeTask(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  if (index >= 1 && index <= tasks.length) {
    tasks.splice(index - 1, 1);

    for (let i = index - 1; i < tasks.length; i++) {
      tasks[i].index = i + 1;
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

export function changeToIcon(item) {
  const options = item.querySelector(".options");
  const trash = item.querySelector(".trash");

  if (options.style.display === "none") {
    options.style.display = "inline";
    trash.style.display = "none";
  } else {
    options.style.display = "none";
    trash.style.display = "inline";
  }
}

export function editTaskDescription(index, newDescription) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach((task) => {
    if (task.index === index) {
      task.description = newDescription;
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
};


