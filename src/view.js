import { format, parseISO } from 'date-fns';

const View = (() => {
  const buttonComponent = (string, onclick) => {
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = string;
    deleteButton.setAttribute('onclick', onclick);
    return deleteButton;
  };

  const buttonForModal = (string, dataTarget, dataToogle) => {
    const button = document.createElement('button');
    button.innerHTML = string;
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'btn btn-primary');
    button.setAttribute('data-toggle', `${dataToogle}`);
    button.setAttribute('data-target', `${dataTarget}`);
    return button;
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

  const createModal = (id, toDo) => {
    const modal = document.createElement('div');
    modal.setAttribute('class', 'modal fade');
    modal.id = id;
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'exampleModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `<div class='modal-dialog' role='document'>
        <div class='modal-content'>
        <div class='modal-header'>
          <h5 class='modal-title' id='exampleModalLabel'>Title: ${toDo.title}</h5>
          <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
        <div class='modal-body'>
          Description: ${toDo.description}<br>
          Due Date: ${format(parseISO(toDo.dueDate), 'MMM-dd-yy')}<br>
          Description: ${toDo.priority}<br>
        </div>
        <div class='modal-footer'>
          <button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>
        </div>
      </div>
    </div>
  </div>`;

    return modal;
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
    const modalButton = buttonForModal('View To Do', `#project-${projectId}-toDo-${toDoId}`, 'modal');
    const modalView = createModal(`project-${projectId}-toDo-${toDoId}`, toDo);
    status.type = 'checkbox';
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
    toDoWrapper.append(modalButton);
    toDoWrapper.append(modalView);
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

  const clearForm = (formId) => {
    const formElements = document.getElementById(`${formId}`).elements;

    for (let i = 0; i < formElements.length; i += 1) {
      const fieldType = formElements[i].type.toLowerCase();

      switch (fieldType) {
        case 'text':
        case 'date':
          formElements[i].value = '';
          break;
        case 'select-one':
          formElements[i].selectedIndex = 0;
          break;
        default:
          break;
      }
    }
  };

  return {
    listProjects,
    updateProjectView,
    updateProjectSelectList,
    addProjectToSelectList,
    addToDoToProject,
    deleteProjects,
    clearForm,
  };
})();

export default View;