const {gql} = require('apollo-server');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    routineCount: Int
    routines: [Routine]
    exercises: [Exercise]
  }

  type Routine {
    _id: ID
    routineName: String
    createdAt: String
    userId: String
    exercises: [String]
  }

  type Exercise {
    _id: ID
    exerciseName: String
    exerciseCategory: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input saveExerciseInput {
    exerciseId: String
    exerciseName: String
    exerciseCategory: String
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
    addRoutine(routineName: String!, exercises: [String]!): User
    addExercise(exerciseName: String!, exerciseCategory: String!): Exercise
  }
`;

module.exports = typeDefs;