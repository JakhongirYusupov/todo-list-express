const path = require("path");
const { readFile, writeFile } = require("../utils");

const Course = {
  GET: (req, res) => {
    res.sendFile(path.resolve('src/client/home/index.html'));
  },

  GETCOURSES: (req, res) => {
    const courses = readFile("courses.json");
    const { type } = req.headers;
    const { id } = req.user;

    if (type === "all") {
      const data = courses.filter(({ userId }) => userId === id);
      return res.json({
        status: 200,
        message: "success",
        data
      })
    }
    if (type === "active") {
      const data = courses.filter(({ userId, checked }) => userId === id && checked === false);
      return res.json({
        status: 200,
        message: "success",
        data
      })
    }
    if (type === "complated") {
      const data = courses.filter(({ userId, checked }) => userId === id && checked === true);
      return res.json({
        status: 200,
        message: "success",
        data
      })
    }

    else return res.json("select type")
  },
  POST: (req, res) => {
    try {
      const courses = readFile("courses.json");
      const { todo } = req.body;
      const { id } = req.user;

      if (todo?.length && typeof todo === "string") {
        const userCourse = {
          id: courses[courses.length - 1]?.id + 1 || 1,
          todo,
          checked: false,
          userId: id
        }
        courses.push(userCourse);
        writeFile("courses.json", courses);
        return res.json({ "status": 200, "message": "okay" });
      } else return res.json({ "status": 400, "message": "todo empty" })
    } catch (error) {
      console.log(error);
    }
  },

  PUT: (req, res) => {
    try {
      const courses = readFile("courses.json");
      const { id } = req.user;
      const { todoId } = req.body;

      if (typeof todoId === "number") {
        let course = courses.findIndex((el) => el.id === todoId && el.userId === id);
        if (course !== -1) {
          courses[course].checked = !courses[course].checked;
          writeFile("courses.json", courses);

          return res.json({ status: 200, message: "success" });
        }
        return res.json({ status: 404, message: "Course not found" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  DELETE: (req, res) => {
    try {
      const courses = readFile("courses.json");
      const { id } = req.user;
      const { todoId } = req.body;

      if (typeof todoId === "number") {
        let course = courses.findIndex((el) => el.id === todoId && el.userId === id);
        if (course !== -1) {
          courses.splice(course, 1);
          writeFile("courses.json", courses);

          return res.json({ status: 200, message: "success delete" });
        }
        return res.json({ status: 404, message: "Course not found" });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = Course;