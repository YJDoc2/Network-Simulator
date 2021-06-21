const data = {
  name: "Project1",
  nodes: {}, //node structure
  enqueue: {}, //user defined
};
export const download = () => {
  const element = document.createElement("a");
  const file = new Blob([JSON.stringify(data)], {
    type: "text/plain;charset=utf-8",
  });
  element.href = URL.createObjectURL(file);
  element.download = `${data.name}.json`;
  document.body.appendChild(element);
  element.click();
};
