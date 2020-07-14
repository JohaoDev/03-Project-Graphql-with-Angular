const personQueries = require("./queries/person.queries"),
  personMutations = require("./mutations/person.mutations"),
  personTypes = require("./types/person.types");

module.exports = {
  Query: personQueries,
  Mutation: personMutations,
  ...personTypes,
};
