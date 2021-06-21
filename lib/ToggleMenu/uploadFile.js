export const upload = () => {
  console.log("Upload");
  new Promise((resolve) => {
    const inputFileElement = document.createElement("input");
    inputFileElement.setAttribute("type", "file");
    inputFileElement.setAttribute("multiple", "true");
    inputFileElement.setAttribute("accept", ".json");

    inputFileElement.addEventListener(
      "change",
      async (event) => {
        const { files } = event.target;
        if (!files) {
          return;
        }

        const filePromises = [...files].map((file) => file.text());
        console.log(filePromises);
        resolve(await Promise.all(filePromises));
      },
      false
    );
    inputFileElement.click();
  });
};
