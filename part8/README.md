### GraphQL

In this part we will dive more into GraphQL.<br>Facebook's alternative to REST for communication between browser and server.

GraphQL was invented in 2012 and was released to public at<br>2015 and it is still used at Facebook.

GraphQL is a query language for your API, and serve-side<br> runtime for executing queries using a type<br>system you define for your data.

## Schema

example:

<strong>const typeDefs = gql\`<br>&nbsp;type Query{<br>&nbsp;&nbsp;me: User -"returns <br>},<br>&nbsp;type User {<br>&nbsp;&nbsp;id: ID!<br>&nbsp;name: String!<br>}\`</strong>
