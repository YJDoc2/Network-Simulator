import { getSimulator } from "../init";

/**
 *  Function to dowload the simulation in form of .json
 *  File includes edges and nodes; node include its memory, function and queue.
 *
 *  @param {string} name
 *          -name Name of the project to be downloaded
 *
 */
export const download = async (e, name) => {
  let sim = getSimulator();
  const data = sim.toSave(true);

  e.preventDefault();
  const element = document.createElement("a");
  const file = new Blob([JSON.stringify(data)], {
    type: "text/plain;charset=utf-8",
  });
  element.href = URL.createObjectURL(file);
  element.download = `${name}.json`;
  document.body.appendChild(element);
  element.click();
};
