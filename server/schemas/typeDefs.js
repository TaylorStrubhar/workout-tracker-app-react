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
    routineName: String!
    createdAt: String
    userId: String
    exercises: [Exercise]!
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
    exerciseName: String
    exerciseCategory: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    routines(username: String): [Routine]
    routine(_id: ID!): Routine
    exercise(_id: ID!): Exercise
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addRoutine(routineName: String!, exercises: [String]!): Routine
    addExercise(exerciseName: String!, exerciseCategory: String!): Exercise
    deleteExercise(_id: ID!): Exercise
    }
`;

module.exports = typeDefs;