const path = require("path")

const Course = {
  GET: (req, res) => {
    res.sendFile(path.resolve('src/client/home/index.html'));
  },
  POST: (req, res) => {
    res.send("okay");
  }
};

module.exports = Course;