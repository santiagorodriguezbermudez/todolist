const Project = (title) => {
  const todoList = [];

  const editTitle = (title) => {
    this.title = title;
  };

  const addTodoList = (todo) => {
    todoList.push(todo);
  };

  const removeTodoFromProject = (todo) => {
    const index = this.todoList.indexOf(todo);
    if (index >= 0) {
      this.todoList.splice(index, 1);
    } else {
      return -1;
    }
    return this.todoList;
  };

  const getTodosForProject = () => {
    return this.todoList;
  };

  return {
    title,
    addTodoList,
    editTitle,
    getTodosForProject,
    removeTodoFromProject,
  };
};

export default Project;