import { format, parseISO } from 'date-fns';

const View = (() => {
  const renderProjects = (project, parentElement, id) => {
    const projectWrapper = document.createElement('div');
    projectWrapper.id = id;
    const projectTitle = document.createElement('h3');
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete Project';
    deleteButton.setAttribute('onclick', `deleteProject(${id})`);
    projectTitle.innerHTML = project.title;
    projectWrapper.append(projectTitle);
    projectWrapper.append(deleteButton);
    parentElement.append(projectWrapper);
  };

  const addToDoToProject = (projectId, toDo, toDoId) => {
    const currentProject = document.getElementById(`${projectId}`);
    const toDoWrapper = document.createElement('div');
    toDoWrapper.id = `project-${projectId}-toDo-${toDoId}`;
    const title = document.createElement('p');
    const status = document.createElement('input');
    status.type = 'checkbox';
    const description = document.createElement('p');
    const dueDate = document.createElement('span');
    const priority = document.createElement('span');
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