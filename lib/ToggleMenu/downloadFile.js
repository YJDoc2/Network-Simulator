import { getSimulator } from "../init";
export const download = async (e, name) => {
  let sim = getSimulator();
  // let structure = await localStorage.getItem('structure');
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
