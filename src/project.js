const Project = (title) => {
  const todoList = [];

  const editTitle = (title) => {
    this.title = title;
  };

  const addTodoList = (todo) => {
    todoList.push(todo);
  };

  const removeTodoFromProject = (toDoId) => {
    todoList.splice(toDoId, 1);
  };

  const getTodosForProject = () => todoList;

  return {
    title,
    addTodoList,
    editTitle,
    getTodosForProject,
    removeTodoFromProject,
  };
};

export default Project;