const bcrypt = require("bcrypt")

let User = require("../../models/userModel");

module.exports = {
  createPerson: async (_, { input }) => {
    let persons, email = input.email;
    try {
      await User.create(input);
      persons = await User.find({ email });
      console.log(persons);
    } catch (error) {
      console.error(error);
    }
    return persons;
  },

  updatePerson: async (_, { _id, input }) => {
    let person;
    try {
      await User.updateOne({ _id }, { $set: input });
      person = await User.find({ _id });
    } catch (error) {
      console.error(error);
    }
    return person;
  },

  deletePerson: async (_, { _id }) => {
    let persons;
    try {
      await User.deleteOne({ _id });
      persons = await User.find();
    } catch (error) {
      console.error(error);
    }
    return persons;
  },
};

/* CREATE USERS */
// mutation {
// createStudent(input: {
// name: "Johao",
// lastname: "Perlaza",
// email: "johao@gmail.com",
// password: "1234"
// }) {
// _id
// email
// password
// }
// }

/* UPDATE USERS */
// mutation {
//   updateStudent(_id: "5f06838dfd001e6e113e0f86", input: {
//     email: "test@gmail.com"
//     password: "5678"
//   }) {
//     email
//     password
//   }
//   }

/* DELETE USERS */
// mutation {
// deleteStudent(_id: "5f06838ffd001e6e113e0f89") {
// _id
// email
// password
// }
// }
