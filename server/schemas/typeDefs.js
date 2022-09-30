const {gql} = require('apollo-server');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    routineCount: Int
    routines: [Routine]
    exercise: [Exercise]
  }

  type Routine {
    _id: ID
    routineName: String
    createdAt: String
    username: String
    exercises: [Exercise]
  }

  type Exercise {
    _id: ID
    exerciseName: String
    category: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input saveExerciseInput {
    exerciseName: String
    weight: Int
    reps: Int
    category: String
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
    addRoutine(routineName: String!, exercises: [saveExerciseInput]!): Routine
    addExercise(exerciseName: String!, category: String!): Exercise
  }
`;

module.exports = typeDefs;