const fs = require("fs");
const path = require("path");

// The directory to read files from
const directoryPath = "../server-src";

// The directory to write the output file to
const outputDirectory = "./";

// The output file name
const outputFile = "server-code.txt";

// The file extensions to include
const fileExtensions = [".html", ".css", ".js"];

// Read all files in the directory with the given extensions
fs.readdir(directoryPath, (err, files) => {
  if (err) throw err;

  const htmlFileContents = [];
  const cssFileContents = [];
  const jsFileContents = [];
  const scriptFileContents = [];

  files.forEach((file) => {
    const fileExt = path.extname(file);
    if (fileExtensions.includes(fileExt) && file !== "script.js") {
      const filePath = path.join(directoryPath, file);
      const content = fs.readFileSync(filePath, "utf8");
      if (fileExt === ".html") {
        htmlFileContents.push({ name: file, content });
      } else if (fileExt === ".css") {
        cssFileContents.push({ name: file, content });
      } else {
        jsFileContents.push({ name: file, content });
      }
    } else if (file === "script.js") {
      const filePath = path.join(directoryPath, file);
      const content = fs.readFileSync(filePath, "utf8");
      scriptFileContents.push(content);
    }
  });

  // Sort the HTML and CSS file contents alphabetically by name
  htmlFileContents.sort((a, b) => a.name.localeCompare(b.name));
  cssFileContents.sort((a, b) => a.name.localeCompare(b.name));

  // Combine the file contents in order with a newline and header between each file
  const outputContent =
    htmlFileContents
      .map(
        (file) =>
          `/*------------------------------${file.name}------------------------------*/\n${file.content}\n`
      )
      .join("") +
    cssFileContents
      .map(
        (file) =>
          `/*------------------------------${file.name}------------------------------*/\n${file.content}\n`
      )
      .join("") +
    jsFileContents
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(
        (file) =>
          `/*------------------------------${file.name}------------------------------*/\n${file.content}\n`
      )
      .join("") +
    `/*------------------------------script.js------------------------------*/\n${scriptFileContents.join(
      "\n"
    )}`;

  // Write the file contents to the output file
  const outputFilePath = path.join(outputDirectory, outputFile);
  fs.writeFile(outputFilePath, outputContent, (err) => {
    if (err) throw err;
    console.log(`File written to ${outputFilePath}`);
  });
});
