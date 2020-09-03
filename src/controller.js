import ToDo from './todo';
import Project from './project';
import View from './view';

const Controller = (() => {
  const projectsArr = [];

  const addToDo = () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priorities');
    const selectedPriority = priority.options[priority.selectedIndex].text;
    const project = document.getElementById('projects');
    const selectedProject = project.options[project.selectedIndex].text;
    const todo = ToDo(title, description, dueDate, selectedPriority);

    const projectIndex = projectsArr.indexOf(selectedProject);
    projectsArr[projectIndex].addTodoList(todo);
  };

  const addProject = () => {
    const title = document.getElementById('project-title').value;
    const project = Project(title);
    projectsArr.push(project);
  };

  const start = () => {
    console.log(projectsArr);
    View.listProjects(projectsArr);
  };

  return {
    addToDo,
    addProject,
    start,
  };
})();

export default Controller;