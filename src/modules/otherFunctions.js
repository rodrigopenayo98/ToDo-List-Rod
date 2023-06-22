// updateDescription.js

const updateDescription = (localGet, id, newDescription) => {
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

export default updateDescription;

