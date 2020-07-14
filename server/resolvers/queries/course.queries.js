let Course = require("../../models/courseModel");

module.exports = {
  getCourses: async () => {
    let courses;
    try {
      courses = await Course.find();
    } catch (error) {
      console.error(error);
    }
    return courses;
  },

  getCourse: async (_, { _id }) => {
    let course;
    try {
      course = await Course.find({ _id });
    } catch (error) {
      console.error(error);
    }
    return course;
  },
};
