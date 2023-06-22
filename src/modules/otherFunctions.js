export const updateDescription = (localGet, id, newDescription) => {
  const updatedLocalGet = localGet.map((item) => {
    if (item.index === id) {
      return {
        ...item,
        description: newDescription,
      };
    }
    return item;
  });

  return updatedLocalGet;
};

export const updateCompleted = (localGet, id, newCompleted) => {
  const updatedLocalGet = localGet.map((item) => {
    if (item.index === id) {
      return {
        ...item,
        completed: newCompleted,
      };
    }
    return item;
  });

  return updatedLocalGet;
};

export const clearCompletedTasks = (tasks) => {
  return tasks.filter((task) => !task.completed);
};