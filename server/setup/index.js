const env = require("dotenv").config(),
  { graphqlHTTP } = require("express-graphql"),
  { schema } = require("../schemas/configSchema"),
  app = require("./app"),
  port = process.env.PORT || 3000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(port, (err) => {
  !err
    ? console.log(`The service is running at http://localhost:${port}/`)
    : console.log(`the service is not working`);
});
