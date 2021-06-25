const { getSimulator } = require("../init");
const { LOCAL_SAVE_KEY } = require("../constants");
/**
 * Function to save the simluation to localStorage.
 * 
 * @param {String} name - Name of file.
 */
exports.saveToLocal = (name) => {
  let sim = getSimulator();
  let projects = JSON.parse(localStorage.getItem(LOCAL_SAVE_KEY)) || {};
  projects[name] = sim.toSave();
  localStorage.setItem("lastSaved", name);
  localStorage.setItem(LOCAL_SAVE_KEY, JSON.stringify(projects));
};
