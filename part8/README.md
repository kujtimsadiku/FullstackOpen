### GraphQL

In this part we will dive more into GraphQL.
Facebook's alternative to REST for communication between browser and server.

GraphQL was invented in 2012 and was released to public at 2015 and it is still used at Facebook.

GraphQL is a query languagefor your AP, and serve-side runtime for executing queries using a type system you define for your data.

## Schema

example:

<strong>const typeDefs = gql\`<br>&nbsp;type Query{<br>&nbsp;&nbsp;me: User -"returns <br>},<br>&nbsp;type User {<br>&nbsp;&nbsp;id: ID!<br>&nbsp;name: String!<br>}\`</strong>
