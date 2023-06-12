// Importar el módulo localGet desde el archivo storage.js
import localGet from './localStorage.js';

// Definir la función clearCompleted
const clearAllCompleted = () => {
  // Filtrar los elementos del localGet que no estén completados
  let inCompleted = localGet.filter((item) => {
    if (!item.completed) {
      return item;
    }
    return null;
  });

  // Mapear los elementos inCompleted y asignarles un nuevo índice
  inCompleted = inCompleted.map((item, id) => {
    item.index = id + 1;
    return item;
  });

  // Guardar los elementos inCompleted en el almacenamiento local
  localStorage.setItem('listInMemory', JSON.stringify(inCompleted));

  // Recargar la página actual
  window.location.reload();
};

// Exportar la función clearCompleted como el valor predeterminado
export default clearAllCompleted;
