const { getSimulator } = require("../init");
const { LOCAL_SAVE_KEY } = require("../constants");

exports.saveToLocal = (name) => {
  let sim = getSimulator();
  let projects = JSON.parse(localStorage.getItem(LOCAL_SAVE_KEY)) || {};
  console.log(projects);
  projects[name] = sim.toSave();
  localStorage.setItem("name", name);
  localStorage.setItem(LOCAL_SAVE_KEY, JSON.stringify(projects));
};
