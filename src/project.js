const Project = (title) => {
  let todoList = [];
  
  const editTitle = (title) => {
    this.title = title;
  };

  const addTodoList = (todo) => {
    todoList.push(todo);
    return this.todoList;
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
    this.todoList;
  };

  return {
    title,
    addTodoList,
    editTitle,
    getTodosForProject,
    removeTodoFromProject
  }
}