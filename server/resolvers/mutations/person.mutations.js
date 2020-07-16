const bcrypt = require("bcrypt");

let User = require("../../models/userModel");

module.exports = {
  createPerson: async (_, { input }) => {
    let persons,
      created = false;

    try {
      let encodePassword = bcrypt.hashSync(
        input.password,
        bcrypt.genSaltSync(10)
      );
      input.password = encodePassword;
      input.createAt = new Date();

      await User.create(input);
      // persons = await User.find({ email });
      // console.log(persons);
      created = true;
    } catch (error) {
      console.error(error);
    }
    return created;
  },

  updatePerson: async (_, { _id, input }) => {
    let person,
      updated = false;

    try {
      await User.updateOne({ _id }, { $set: input });
      // person = await User.find({ _id });
      updated = true;
    } catch (error) {
      console.error(error);
    }
    return updated;
  },

  deletePerson: async (_, { _id }) => {
    let deleted = false;
    try {
      await User.deleteOne({ _id });
      deleted = true;
    } catch (error) {
      console.error(error);
    }
    return deleted;
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
// mutation deleteUser($_id: ID!) {
// deletePerson(_id: $_id)
// }
