import ToDo from './todo';
import Project from './project';
import View from './view';
import AppLocalStorage from './storage';

const Controller = (() => {
  const start = () => {
    View.listProjects(AppLocalStorage.parseData('projects'));
    View.updateProjectSelectList(AppLocalStorage.parseData('projects'), 'projects');
  };

  const addToDo = () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priorities');
    const selectedPriority = priority.options[priority.selectedIndex].text;
    const project = document.getElementById('projects');
    const selectedProject = project.options[project.selectedIndex].text;
    const projectIndex = AppLocalStorage.getProjectByTitle(selectedProject);

    if (title === '' || description === '' || dueDate === '' || selectedPriority === 'Choose a priority') {
      View.alertForm('All fields must have a value');
    } else {
      const todo = ToDo(title, description, dueDate, selectedPriority);
      AppLocalStorage.updateProjectTodoList(projectIndex, todo);
      View.deleteProjects();
      start();
      View.clearForm('todo-form');
    }
  };

  const updateToDo = (modalId, projectId, toDoId) => {
    let title = document.getElementById(`${modalId}-modal-title`).innerHTML;
    let description = document.getElementById(`${modalId}-modal-description`).innerHTML;
    const project = document.getElementById(`${modalId}-modal-project`);
    const priority = document.getElementById(`${modalId}-modal-priority`);
    const selectedPriority = priority.options[priority.selectedIndex].text;
    const selectedProject = project.options[project.selectedIndex].text;
    const projectIndex = AppLocalStorage.getProjectByTitle(selectedProject);
    const date = document.getElementById(`${modalId}-modal-date`).value;

    if (description === '') {
      document.getElementById(`${modalId}-modal-description`).innerHTML = 'No Description';
      description = 'No Description';
    }

    if (title === '') {
      View.alertForm('To Do Title cannot be empty');
      document.getElementById(`${modalId}-modal-title`).innerHTML = 'Unnamed';
      title = 'Unnamed';
    }

    const todo = ToDo(title, description, date, selectedPriority);
    AppLocalStorage.removeToDo(projectId, toDoId);
    AppLocalStorage.updateProjectTodoList(projectIndex, todo);
    View.deleteProjects();
    start();
  };

  const addProject = () => {
    const title = document.getElementById('project-title').value;
    if (title !== '') {
      const project = Project(title, []);
      AppLocalStorage.storeLocal('projects', project);
      View.deleteProjects();
      start();
      View.clearForm('project-form');
    } else {
      View.alertForm('The project must have a name');
    }
  };

  const toggleSaveBtn = (projectId) => {
    View.showSaveBtn(projectId);
  };

  const onToDoClick = (modalId) => View.showSaveBtnToDo(modalId);

  const updateProjectTitle = (projectId) => {
    let title = document.getElementById(`project-title-${projectId}`).innerHTML;

    if (title === '') {
      View.alertForm('The project title cannot be empty');
      document.getElementById(`project-title-${projectId}`).innerHTML = 'Unnamed';
      title = 'Unnamed';
    }

    AppLocalStorage.updateProject(projectId, title);
    View.showSaveBtn(projectId);
    View.updateProjectSelectList(AppLocalStorage.parseData('projects'), 'projects');
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

  const addSelectedProjectsToModal = (modalId, projectTitle) => {
    View.updateProjectSelectList(AppLocalStorage.parseData('projects'), modalId);
    View.addCurrentProjectToSelectedList(modalId, projectTitle);
  };

  return {
    addToDo,
    addProject,
    deleteProject,
    deleteToDo,
    start,
    toggleSaveBtn,
    updateProjectTitle,
    onToDoClick,
    addSelectedProjectsToModal,
    updateToDo,
  };
})();

export default Controller;