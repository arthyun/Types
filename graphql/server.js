const { ApolloServer, gql } = require('apollo-server');
const mariadb = require('mariadb');

// Database
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '3316',
  database: 'test',
  port: 3306,
  connectionLimit: 5
});

const executePool = async (sql, value) => {
  let conn;
  conn = await pool.getConnection();
  const result = await conn.query(sql, value);
  await conn.release();
  return result;
};

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

// Schema
const typeDefs = gql`
  # 타입 지정
  type Book {
    title: String
    author: String
  }
  type Db {
    USER_NAME: String
    USER_DATE: String
    USER_ID: String
    SEQ: Int
  }
  type User {
    userId: Int!
    userName: String
    userEmail: String
  }
  # Response 타입 지정
  type Query {
    books: [Book]
    db: [Db]
    users(userId: Int): [User]
  }
`;

// Resolver
const resolvers = {
  Query: {
    books: () => books,
    db: async () => await executePool('select * from user', ''),
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
