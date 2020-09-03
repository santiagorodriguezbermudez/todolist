import Controller from './controller';


window.onload = () => {
  Controller.start();
};

window.addProject = () => {
  console.log('before');
  Controller.addProject();
  console.log('after');
};
