let Course = require("../../models/courseModel");

module.exports = {
  createCourse: async (_, { input }) => {
    let courses,
      created = false;
    try {
      await Course.create(input);
      // courses = await Course.find();
      created = true;
    } catch (error) {
      console.error(error);
    }
    return created;
  },

  updateCourse: async (_, { _id, input }) => {
    let course,
      updated = false;

    try {
      // let participants = [];
      // if (input.participants.length > 0) {
      //   input.participants.forEach((idStudent) => {
      //     participants.push(idStudent);
      //   });
      // }
      // input.participants = participants;
      await Course.updateOne({ _id }, { $set: input });
      // course = await Course.find({ _id });
      updated = true;
    } catch (error) {
      console.error(error);
    }
    return updated;
  },

  deleteCourse: async (_, { _id }) => {
    let courses,
      deleted = false;
    try {
      await Course.deleteOne({ _id });
      // courses = await Course.find();
      deleted = true;
    } catch (error) {
      console.error(error);
    }
    return deleted;
  },
};
