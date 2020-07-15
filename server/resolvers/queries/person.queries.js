const bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken");

let User = require("../../models/userModel");

module.exports = {
  getPersons: async () => {
    let persons;
    try {
      persons = await User.find();
    } catch (error) {
      console.error(error);
    }
    return persons;
  },

  getPerson: async (_, { _id }) => {
    let person;
    try {
      person = await User.find({ _id });
    } catch (error) {
      console.error(error);
    }
    return person;
  },

  login: async (_, { email, password }) => {
    let person,
      found = false;

    try {
      data = await User.find({ email });
      // console.log(data);
      let token,
        tokenBody = {
          name: data[0].name,
          email: data[0].email,
          role: data[0].role,
          sessionID: data[0].sessionID,
        };
      // console.log(tokenBody);

      bcrypt.compareSync(password, data[0].password)
        ? ((token = jwt.sign({ data: tokenBody }, process.env.KEY_JWT, {
            algorithm: "HS256",
            expiresIn: 300,
          })),
          (person = {
            ok: true,
            data: null,
            msg: "User OK",
            token,
          }))
        : (person = {
            ok: false,
            data: null,
            msg: "Incorrect password",
            token: null,
          });
      found = true;
    } catch (error) {
      console.error(error);
    }

    return person;
  },
};
