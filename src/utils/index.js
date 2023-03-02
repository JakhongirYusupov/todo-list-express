const fs = require("fs");
const path = require("path");

const readFile = (filename) => {
  return JSON.parse(fs.readFileSync(path.resolve('src/models/' + filename)));
};

const writeFile = (filename, data) => {
  return fs.writeFileSync(path.resolve('src/models/' + filename), JSON.stringify(data, 4, 4));
};

module.exports = {
  readFile,
  writeFile
}