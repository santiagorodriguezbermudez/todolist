import { format, parseISO } from 'date-fns';

const View = (() => {
  const renderProjects = (project, parentElement, id) => {
    const projectWrapper = document.createElement('div');
    projectWrapper.id = id;
    const projectTitle = document.createElement('h3');
    projectTitle.innerHTML = project.title;
    projectWrapper.append(projectTitle);
    parentElement.append(projectWrapper);
  };

  const listProjects = (projectsArr) => {
    const projectsListContainer = document.getElementById('projects-container');

    projectsArr.forEach((project, index) => renderProjects(project, projectsListContainer, index));
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

  const addToDoToProject = (id, todo) => {
    const currentProject = document.getElementById(`${id}`);
    const title = document.createElement('p');
    const description = document.createElement('p');
    const dueDate = document.createElement('span');
    const priority = document.createElement('span');
    title.innerHTML = todo.title;
    description.innerHTML = todo.description;
    console.log(todo.dueDate);
    dueDate.innerHTML = format(parseISO(todo.dueDate), 'MMM-dd-yy');
    priority.innerHTML = todo.priority;
    currentProject.append(title);
    currentProject.append(description);
    currentProject.append(dueDate);
    currentProject.append(priority);
  };

  return {
    listProjects,
    updateProjectView,
    updateProjectSelectList,
    addProjectToSelectList,
    addToDoToProject,
  };
})();

export default View;