const roleResolvers = require("../resolvers/role.resolvers");

const { makeExecutableSchema } = require("graphql-tools"),
  { join } = require("path"),
  { readFileSync } = require("fs"),
  courseResolver = require("../resolvers/course.resolvers"),
  personResolver = require("../resolvers/person.resolvers"),
  roleResolver = require("../resolvers/role.resolvers"),
  typeDefs = readFileSync(join(__dirname, "schema.graphql"), "utf-8"),
  schema = makeExecutableSchema({
    typeDefs,
    resolvers: [courseResolver, personResolver, roleResolver],
  });

module.exports = { schema };
