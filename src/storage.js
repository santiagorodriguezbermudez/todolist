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

  return {
    storeLocal,
  };
})();

export default AppLocalStorage;