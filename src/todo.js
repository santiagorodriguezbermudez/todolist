
const ToDo = ((title, description, dueDate, priority) => {
  let notes = '';
  const checklistArray = [];

  const editTitle = (title) => {
    this.title = title;
  };

  const editDescription = (description) => {
    this.description = description;
  };

  const editDueDate = (dueDate) => {
    this.dueDate = dueDate;
  };

  const editPriority = (priority) => {
    this.priority = priority;
  };

  const editNotes = (newNotes) => {
    notes = newNotes;
  };

  const addItemToChecklist = (item) => {
    checklistArray.push(item);
    return this.checklistArray;
  };

  const deleteItemToChecklist = (item) => {
    const index = this.checklistArray.indexOf(item);
    if (index >= 0) {
      this.checklistArray.splice(index, 1);
    } else {
      return -1;
    }
    return this.checklistArray;
  };

  return ({
    title,
    description,
    dueDate,
    priority,
    editDescription,
    editDueDate,
    editPriority,
    editTitle,
    editNotes,
    addItemToChecklist,
    deleteItemToChecklist,
  });
});

export default ToDo;
