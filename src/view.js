const View = (() => {
  const renderProjects = (project, parentElement) => {
    const projectWrapper = document.createElement('div');
    const projectTitle = document.createElement('h3');
    projectTitle.innerHTML = project.title;
    projectWrapper.append(projectTitle);
    parentElement.append(projectWrapper);
  };

  const listProjects = (projectsArr) => {
    const projectsListContainer = document.getElementById('projects-container');

    projectsArr.forEach((project) => renderProjects(project, projectsListContainer));
  };

  const updateProjectView = (project) => {
    const projectsListContainer = document.getElementById('projects-container');
    renderProjects(project, projectsListContainer);
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

  return {
    listProjects,
    updateProjectView,
    updateProjectSelectList,
    addProjectToSelectList,
  };
})();

export default View;