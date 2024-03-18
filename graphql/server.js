const { ApolloServer, gql } = require('apollo-server');

// Schema
const typeDefs = gql`
  # 타입 지정
  type Book {
    title: String
    author: String
  }
  type User {
    userId: Int!
    userName: String
    userEmail: String
  }
  # Response 타입 지정
  type Query {
    books: [Book]
    users(userId: Int): [User]
  }
`;

// Dummy data
const books = [
  { title: 'The Awakening', author: 'Kate Chopin' },
  { title: 'City of Glass', author: 'Paul Auster' },
  { title: 'Lord of the Rings', author: 'Tolkin' }
];
const users = [
  { userId: 1, userName: 'Hyunho Sohn', userEmail: 'son@k2systems.kr' },
  { userId: 2, userName: 'Seonwoo Lee', userEmail: 'swlee@k2systems.kr' }
];

// Resolver
const resolvers = {
  Query: {
    books: () => books,
    users: (parent, args, contextValue, info) => {
      return users.filter((item) => item.userId === args.userId);
    }
    // users: (_, { userId }) => users.filter((item) => item.userId === userId)
  }
};

// Server Main
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server Ready at ${url}`);
});
