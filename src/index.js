import Controller from './controller';
import './css/styles.scss';


window.onload = () => {
  Controller.start();
};

window.addProject = () => {
  Controller.addProject();
};

window.addToDo = () => {
  Controller.addToDo();
};

window.deleteProject = (projectId) => {
  Controller.deleteProject(projectId);
};

window.deleteToDo = (projectId, toDoId) => {
  Controller.deleteToDo(projectId, toDoId);
};

window.onProjectTitleClick = (projectId) => {
  Controller.toggleSaveBtn(projectId);
};

window.onProjectClickSave = (projectId) => {
  Controller.updateProjectTitle(projectId);
};