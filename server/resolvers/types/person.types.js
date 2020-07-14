module.exports = {
  Person: {
    __resolveType: (person, context, info) => {
      switch (person.role) {
        case "5f0b770e0551882c14551892":
          return "Professor";
        case "5f0b77180551882c14551893":
          return "Student";
        default:
          return "Student";
      }
    },
  },
};
