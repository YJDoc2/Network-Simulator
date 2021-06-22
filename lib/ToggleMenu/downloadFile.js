import { Simulator } from '../Simulator/Simulator';
import { init, getSimulator } from '../init';
export const download = async (e, name) => {
  let structure = await localStorage.getItem('structure');
  const data = {
    name: 'Project1',
    nodes: JSON.parse(structure),
    //node structure

    enqueue: {}, //user defined
  };
  console.log(data);
  e.preventDefault();
  const element = document.createElement('a');
  const file = new Blob([JSON.stringify(data)], {
    type: 'text/plain;charset=utf-8',
  });
  element.href = URL.createObjectURL(file);
  element.download = `${name}.json`;
  document.body.appendChild(element);
  element.click();
};
