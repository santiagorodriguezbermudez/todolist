import { format, parseISO } from 'date-fns';

const View = (() => {

  const buttonComponent = (string, onclick) => {
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = string;
    deleteButton.setAttribute('onclick', onclick);
    return deleteButton;
  };

  const renderProjects = (project, parentElement, id) => {
    const projectWrapper = document.createElement('div');
    projectWrapper.id = id;
    const projectTitle = document.createElement('h3');
    const deleteButton = buttonComponent('Delete Project', `deleteProject(${id})`);
    projectTitle.innerHTML = project.title;
    projectWrapper.append(projectTitle);
    projectWrapper.append(deleteButton);
    parentElement.append(projectWrapper);
  };

  const addToDoToProject = (projectId, toDo, toDoId) => {
    const currentProject = document.getElementById(`${projectId}`);
    const toDoWrapper = document.createElement('div');
    const title = document.createElement('p');
    const status = document.createElement('input');
    const description = document.createElement('p');
    const dueDate = document.createElement('span');
    const priority = document.createElement('span');
    const deleteButton = buttonComponent('Delete To Do', `deleteToDo(${projectId}, ${toDoId})`);
    status.type = 'checkbox';
    toDoWrapper.id = `project-${projectId}-toDo-${toDoId}`;
    title.innerHTML = toDo.title;
    description.innerHTML = toDo.description;
    dueDate.innerHTML = format(parseISO(toDo.dueDate), 'MMM-dd-yy');
    priority.innerHTML = toDo.priority;
    currentProject.append(toDoWrapper);
    toDoWrapper.append(title);
    toDoWrapper.append(status);
    toDoWrapper.append(description);
    toDoWrapper.append(dueDate);
    toDoWrapper.append(priority);
    toDoWrapper.append(deleteButton);
  };

  const listProjects = (projectsArr) => {
    const projectsListContainer = document.getElementById('projects-container');

    projectsArr.forEach((project, index) => {
      renderProjects(project, projectsListContainer, index);
      project.getTodosForProject().forEach((toDo, toDoId) => addToDoToProject(index, toDo, toDoId));
    });
  };

  const updateProjectView = (project, index) => {
    const projectsListContainer = document.getElementById('projects-container');
    renderProjects(project, projectsListContainer, index);
  };

  const updateProjectSelectList = (arrayProjects) => {
    const selectListContainer = document.getElementById('projects');

    arrayProjects.forEach((project) => {
      const optionElement = document.createElement('option');
      optionElement.setAttribute('value', project.title);
      optionElement.innerHTML = project.title;
      selectListContainer.append(optionElement);
    });
  };

  const addProjectToSelectList = (project) => {
    const selectListContainer = document.getElementById('projects');
    const optionElement = document.createElement('option');
    optionElement.setAttribute('value', project.title);
    optionElement.innerHTML = project.title;
    selectListContainer.append(optionElement);
  };

  const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  const deleteProjects = () => {
    const projectsListContainer = document.getElementById('projects-container');
    const selectListContainer = document.getElementById('projects');
    removeAllChildNodes(projectsListContainer);
    removeAllChildNodes(selectListContainer);
  };


  return {
    listProjects,
    updateProjectView,
    updateProjectSelectList,
    addProjectToSelectList,
    addToDoToProject,
    deleteProjects,
  };
})();

export default View;