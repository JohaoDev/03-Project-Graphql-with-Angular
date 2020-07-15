let Role = require("../../models/roleModel");

module.exports = {
  getRoles: async () => {
    let roles;
    try {
      roles = await Role.find();
    } catch (error) {
      console.error(error);
    }
    return roles;
  },

  getRole: async (_, { _id }) => {
    let role;
    try {
      role = await Role.find({ _id });
    } catch (error) {
      console.error(error);
    }
    return role;
  },
};
