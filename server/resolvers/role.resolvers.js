const roleQueries = require("./queries/role.queries"),
  roleMutations = require("./mutations/role.mutations");

module.exports = {
  Query: roleQueries,
  Mutation: roleMutations,
};
