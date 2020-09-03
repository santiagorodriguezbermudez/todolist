const View = (() => {
  const renderProjects = (project, parentElement) => {
    const projectWrapper = document.createElement('div');
    // console.log(projectWrapper);

    const projectTitle = document.createElement('h3');
    // console.log(projectTitle);

    projectTitle.innerHTML = project.title;
    projectWrapper.append(projectTitle);
    // console.log(projectWrapper);

    parentElement.append(projectWrapper);
    console.log(parentElement);
  };

  const listProjects = (projectsArr) => {
    const projectsListContainer = document.getElementById('projects-container');

    projectsArr.forEach((project) => renderProjects(project, projectsListContainer));
  };

  return {
    listProjects,
  };
})();

export default View;