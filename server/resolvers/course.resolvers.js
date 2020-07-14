const courseQueries = require("./queries/course.queries"),
  courseMutations = require("./mutations/course.mutations"),
  courseTypes = require("./types/course.types");

module.exports = {
  Query: courseQueries,
  Mutation: courseMutations,
  ...courseTypes,
};
