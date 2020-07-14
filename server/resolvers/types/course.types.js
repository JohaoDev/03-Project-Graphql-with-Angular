let User = require("../../models/userModel");

module.exports = {
  Course: {
    participants: async ({ participants }) => {
      let participantsData, ids;
      try {
        ids = participants ? participants.map((id) => id) : [];
        participantsData = ids.length > 0 ? await User.find({ _id: ids }) : [];
      } catch (error) {
        console.error(error);
      }
      return participantsData;
    },
  },
};
