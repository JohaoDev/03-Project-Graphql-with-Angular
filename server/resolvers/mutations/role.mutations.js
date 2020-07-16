let Role = require("../../models/roleModel");

module.exports = {
  createRole: async (_, { input }) => {
    let created = false;
    try {
      await Role.create(input);
      created = true;
    } catch (error) {
      console.error(error);
    }
    return created;
  },

  updateRole: async (_, { _id, input }) => {
    let role,
      updated = false;
    try {
      await Role.updateOne({ _id }, { $set: input });
      // role = await Role.find({ _id });
      updated = true;
    } catch (error) {
      console.error(error);
    }
    return updated;
  },

  deleteRole: async (_, { _id }) => {
    let deleted = false;
    try {
      await Role.deleteOne({ _id });
      deleted = true;
    } catch (error) {
      console.error(error);
    }
    return deleted;
  },
};
