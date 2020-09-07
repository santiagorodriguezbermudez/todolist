import { format, parseISO } from 'date-fns';

const View = (() => {
  const buttonComponent = (string, onclick) => {
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = string;
    deleteButton.setAttribute('onclick', onclick);
    return deleteButton;
  };

  const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  const buttonForModal = (string, dataTarget, dataToogle, id, projectTitle) => {
    const button = document.createElement('button');
    button.innerHTML = string;
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'btn btn-primary');
    button.setAttribute('data-toggle', `${dataToogle}`);
    button.setAttribute('data-target', `${dataTarget}`);
    button.setAttribute('onclick', `createSelectedModalList('${id}-modal-project', '${projectTitle}')`);
    return button;
  };

  const addIconToButton = (buttonElement, classArray) => {
    const icon = document.createElement('i');
    icon.classList.add(...classArray);
    buttonElement.append(icon);
  };

  const renderProjects = (project, parentElement, id) => {
    const projectWrapper = document.createElement('div');
    projectWrapper.id = id;
    projectWrapper.classList.add('project-style');
    const projectHeader = document.createElement('div');
    projectHeader.classList.add('project-header');
    const projectTitle = document.createElement('h3');
    projectTitle.setAttribute('onfocus', `onProjectTitleClick(${id})`);
    projectTitle.setAttribute('contenteditable', true);
    projectTitle.id = `project-title-${id}`;

    const updateProjectBtn = buttonComponent('', `onProjectClickSave(${id})`);
    updateProjectBtn.classList.toggle('d-none');
    updateProjectBtn.id = `project-${id}`;
    updateProjectBtn.classList.add(...['btn', 'btn-success']);
    addIconToButton(updateProjectBtn, ['far', 'fa-save']);

    const deleteButton = buttonComponent('', `deleteProject(${id})`);
    addIconToButton(deleteButton, ['fas', 'fa-trash-alt']);
    deleteButton.classList.add(...['btn', 'btn-danger']);
    projectTitle.innerHTML = project.title;
    projectWrapper.append(projectHeader);
    projectHeader.append(projectTitle);
    projectHeader.append(updateProjectBtn);
    projectHeader.append(deleteButton);
    parentElement.append(projectWrapper);
  };

  const showSaveBtn = (projectId) => {
    const saveBtn = document.getElementById(`project-${projectId}`);
    saveBtn.classList.toggle('d-none');
  };

  const showSaveBtnToDo = (modalId) => {
    const saveBtn = document.getElementById(`savebutton-${modalId}`);
    saveBtn.classList.toogle('d-none');
  };

  const createModal = (projectId, toDo, projectTitle, toDoId) => {
    const id = `project-${projectId}-toDo-${toDoId}`;
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
            <h5 class='modal-title' id='exampleModalLabel'>Title: <span contentEditable=true id='${id}-modal-title'>${toDo.title}</span></h5>
            <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div class='modal-body d-flex justify-content-between flex-column align-items-start'>
            <div class='form-group>
              <label for='${id}-modal-project'>Project</label>
              <select id='${id}-modal-project' class='form-control'>${projectTitle}
              </select>
              <label for="${id}-modal-date" class='my-3'>Due Date: </label>
              <input type="date" name="due-date" id='${id}-modal-date' value="${toDo.dueDate}"><br>
            </div>
            <div class='form-group'>
              <label for="priorities">Priority</label>
              <select id='${id}-modal-priority' name="priorities" class='form-control'>
                <option value="" disabled selected hidden>${toDo.priority}</option>
                <option value="Low">Low</option>
                <option value="High">High</option>
              </select>
            </div>
            <p class='mx-0'>Description: <span contentEditable=true id='${id}-modal-description'>${toDo.description}</span></p>
          </div>
          <div class='modal-footer'>
            <span>Save changes</span>
            <button type='button' class='btn btn-secondary' data-dismiss='modal' onclick="updateToDo('${id}', '${projectId}', '${toDoId}')" ><i class="far fa-save"></i></button>
          </div>
        </div>
      </div>
    </div>`;
    return modal;
  };

  const addCurrentProjectToSelectedList = (modalId, projectTitle) => {
    const selectListContainer = document.getElementById(modalId);
    const optionElement = document.createElement('option');
    optionElement.innerHTML = projectTitle;
    optionElement.setAttribute('selected', true);
    optionElement.setAttribute('hidden', true);
    selectListContainer.append(optionElement);
  };

  const addToDoToProject = (projectId, toDo, toDoId, projectTitle) => {
    const currentProject = document.getElementById(`${projectId}`);
    const toDoWrapper = document.createElement('div');
    toDoWrapper.classList.add('todo-style');
    const title = document.createElement('p');
    const dueDate = document.createElement('p');
    const priority = document.createElement('p');
    const deleteButton = buttonComponent('', `deleteToDo(${projectId}, ${toDoId})`);
    deleteButton.classList.add(...['btn', 'btn-danger', 'mr-3']);
    addIconToButton(deleteButton, ['far', 'fa-trash-alt']);
    const modalButton = buttonForModal('View / Edit', `#project-${projectId}-toDo-${toDoId}`, 'modal', `project-${projectId}-toDo-${toDoId}`, projectTitle);
    const modalView = createModal(projectId, toDo, projectTitle, toDoId);
    title.innerHTML = `Title: ${toDo.title}`;
    dueDate.innerHTML = `Due date: ${format(parseISO(toDo.dueDate), 'MMM-dd-yy')}`;
    priority.innerHTML = `Priority: ${toDo.priority}`;
    currentProject.append(toDoWrapper);
    toDoWrapper.append(title);
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
      project.toDoList.forEach((toDo, toDoId) => addToDoToProject(index, toDo, toDoId, project.title));
    });
  };

  const updateProjectView = (project, index) => {
    const projectsListContainer = document.getElementById('projects-container');
    renderProjects(project, projectsListContainer, index);
  };

  const updateProjectSelectList = (arrayProjects, id) => {
    const selectListContainer = document.getElementById(id);
    removeAllChildNodes(selectListContainer);
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
    showSaveBtn,
    showSaveBtnToDo,
    addCurrentProjectToSelectedList,
  };
})();

export default View;