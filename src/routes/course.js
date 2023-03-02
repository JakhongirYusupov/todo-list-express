const { Router } = require("express");
const Course = require("../controllers/courses");
const TOKENV = require("../middlewares/index");

const route = Router();

route.get("/", Course.GET);
route.get("/courses", TOKENV, Course.GETCOURSES);
route.post("/course", TOKENV, Course.POST);
route.put("/course", TOKENV, Course.PUT);
route.delete("/course", TOKENV, Course.DELETE);

module.exports = route;