import ToDo from './todo';
import Project from './project';
import View from './view';
import AppLocalStorage from './storage';

const Controller = (() => {
  const projectsArr = AppLocalStorage.parseData('projects');

  const addToDo = () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priorities');
    const selectedPriority = priority.options[priority.selectedIndex].text;
    const project = document.getElementById('projects');

    const selectedProject = project.options[project.selectedIndex].text;
    const todo = ToDo(title, description, dueDate, selectedPriority);

    const projectIndex = AppLocalStorage.getProjectByTitle(selectedProject);
    AppLocalStorage.updateProjectTodoList(projectIndex, todo);
    const projectObj = AppLocalStorage.updateProjectTodoList(projectIndex, todo);
    View.addToDoToProject(projectIndex, todo, projectObj.toDoList.length - 1);
    View.clearForm('todo-form');
  };

  const addProject = () => {
    const title = document.getElementById('project-title').value;
    const project = Project(title, []);
    AppLocalStorage.storeLocal('projects', project);
    View.updateProjectView(project, projectsArr.length - 1);
    View.addProjectToSelectList(project);
    View.clearForm('project-form');
  };

  const toggleSaveBtn = (projectId) => {
    View.showSaveBtn(projectId);
  };

  const updateProjectTitle = (projectId) => {
    const title = document.getElementById(`project-title-${projectId}`).innerHTML;
    AppLocalStorage.updateProject(projectId, title);
    View.showSaveBtn(projectId);
  };

  const start = () => {
    View.listProjects(AppLocalStorage.parseData('projects'));
    View.updateProjectSelectList(AppLocalStorage.parseData('projects'));
  };

  const deleteProject = (projectId) => {
    AppLocalStorage.removeProject(projectId);
    View.deleteProjects();
    start();
  };

  const deleteToDo = (projectId, toDoId) => {
    AppLocalStorage.removeToDo(projectId, toDoId);
    View.deleteProjects();
    start();
  };

  return {
    addToDo,
    addProject,
    deleteProject,
    deleteToDo,
    start,
    toggleSaveBtn,
    updateProjectTitle,
  };
})();

export default Controller;