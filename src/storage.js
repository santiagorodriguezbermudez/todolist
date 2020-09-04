const AppLocalStorage = (() => {
  const storeLocal = (keyName, item) => {
    let projects;
    if (localStorage.getItem(`${keyName}`) === null) {
      projects = [];
    } else {
      projects = JSON.parse(localStorage.getItem(`${keyName}`));
    }

    projects.push(item);

    localStorage.setItem(`${keyName}`, JSON.stringify(projects));
  };

  const parseData = (keyName) => {
    let data = JSON.parse(localStorage.getItem(`${keyName}`));
    if (data === null) {
      data = [];
    }
    return data;
  };

  const getProjectByTitle = (projectTitle) => {
    const projectIndex = parseData('projects').map(project => project.title).indexOf(projectTitle);
    return projectIndex;
  };

  const removeProject = (projectIndex) => {
    const projects = parseData('projects');
    projects.splice(projectIndex, 1);

    localStorage.setItem('projects', JSON.stringify(projects));
  };

  const removeToDo = (projectIndex, toDoIndex) => {
    const projects = parseData('projects');
    const updatedProject = projects[projectIndex];
    updatedProject.toDoList.splice(toDoIndex, 1);
    projects.splice(projectIndex, 1, updatedProject);
    localStorage.setItem('projects', JSON.stringify(projects));
  };

  return {
    storeLocal,
    parseData,
    getProjectByTitle,
    removeProject,
    removeToDo,
  };
})();

export default AppLocalStorage;