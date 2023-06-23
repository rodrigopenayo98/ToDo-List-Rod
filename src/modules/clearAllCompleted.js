import localGet from './localStorage.js';

const clearAllCompleted = () => {
  let inCompleted = localGet.filter((item) => {
    if (!item.completed) {
      return item;
    }
    return null;
  });

  inCompleted = inCompleted.map((item, id) => {
    item.index = id + 1;
    return item;
  });

  localStorage.setItem('listInMemory', JSON.stringify(inCompleted));

  window.location.reload();
};

export default clearAllCompleted;
