export const download = () => {
  const data = {
    name: "Project1",
    nodes: {
      //node structure
      parsed_edges: [
        {
          from: 1,
          to: 2,
          id: "09cc4314-a844-4772-9b35-33eb0fd2d4bd",
        },
        {
          from: 1,
          to: 3,
          id: "4e7c18c8-8989-4c64-9399-43b9225326db",
        },
        {
          from: 3,
          to: 4,
          id: "2dc98dab-edd5-4c86-94ff-2a678924882b",
        },
      ],
      parsed_nodes: [
        {
          id: 1,
          label: "A",
        },
        {
          id: 2,
          label: "B",
        },
        {
          id: 3,
          label: "C",
        },
        {
          id: 4,
          label: "D",
        },
      ],
    },
    enqueue: {}, //user defined
  };

  const element = document.createElement("a");
  const file = new Blob([JSON.stringify(data)], {
    type: "text/plain;charset=utf-8",
  });
  element.href = URL.createObjectURL(file);
  element.download = `${data.name}.json`;
  document.body.appendChild(element);
  element.click();
};
