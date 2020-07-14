let Course = require("../../models/courseModel");

module.exports = {
  createCourse: async (_, { input }) => {
    let courses;
    try {
      await Course.create(input);
      courses = await Course.find();
    } catch (error) {
      console.error(error);
    }
    return courses;
  },

  updateCourse: async (_, { _id, input }) => {
    let course;
    try {
      let participants = [];
      if (input.participants.length > 0) {
        input.participants.forEach((idStudent) => {
          participants.push(idStudent);
        });
      }
      input.participants = participants;
      await Course.updateOne({ _id }, { $set: input });
      course = await Course.find({ _id });
    } catch (error) {
      console.error(error);
    }
    return course;
  },

  deleteCourse: async (_, { _id }) => {
    let courses;
    try {
      await Course.deleteOne({ _id });
      courses = await Course.find();
    } catch (error) {
      console.error(error);
    }
    return courses;
  },
};

// mutation {
//   createCourse(
//     input: {
//       title: "hola"
//       professor: "hola"
//       description: "hola"
//       topic: "hola"
//     }
//   ) {
//     _id
//     title
//     professor
//     description
//     topic
//   }
// }

// mutation {
// updateCourse(
// _id:"5f062df425c2ceee4fb8fd24",
// input: {
// title: "hola"
// professor: "hola"
// description: "hola"
// topic: "hola"
// }
// ) {
// _id
// title
// professor
// description
// topic
// }
// }

// mutation {
// deleteCourse(_id: "5f064bf3055d64fd84f24509") {
// _id
// title
// professor
// description
// topic
// }
// }
