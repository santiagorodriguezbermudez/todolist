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

  return {
    storeLocal,
    parseData,
    getProjectByTitle,
  };
})();

export default AppLocalStorage;