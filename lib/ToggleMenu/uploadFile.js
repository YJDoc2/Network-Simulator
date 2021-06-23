export const upload = () =>
  new Promise((resolve) => {
    const inputFileElement = document.createElement("input");
    inputFileElement.setAttribute("type", "file");
    inputFileElement.setAttribute("single", "true");
    inputFileElement.setAttribute("accept", ".json");
    inputFileElement.addEventListener(
      "change",
      async (event) => {
        const { files } = event.target;

        if (!files) {
          return;
        }
        const filePromises = [...files].map((file) => file.text());
        resolve({ name: files[0].name, json: await Promise.all(filePromises) });
      },
      false
    );
    inputFileElement.click();
  });
