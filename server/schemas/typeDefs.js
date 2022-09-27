const {gql} = require('apollo-server');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    workoutCount: Int
    workouts: [Routine]
  }

  type Routine {
    _id: ID
    name: String
    createdAt: String
    username: String
    exercises: [Exercise]
  }

  type Exercise {
    _id: ID
    name: String
    weight: Int
    reps: Int
    category: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    routines(username: String): [Routine]
    routine(_id: ID!): Routine
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addRoutine(name: String!): Routine
  }
`;

module.exports = typeDefs;