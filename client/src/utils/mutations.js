import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      user {
        username
        email
      }
    }
  }
`;

export const ADD_ROUTINE = gql`
  mutation addRoutine($routineName: String!) {
    addRoutine(routineName: $routineName) {
      _id
      routineName
      createdAt
      username
      exercises {
        _id
      }
    }
  }
`;

export const ADD_EXERCISE = gql`
  mutation AddExercise($exerciseName: String!, $exerciseCategory: String!) {
    addExercise(exerciseName: $exerciseName, exerciseCategory: $exerciseCategory) {
      _id
      exerciseName
      exerciseCategory
    }
  }
`;

export const DELETE_EXERCISE = gql`
  mutation DeleteExercise($id: ID!) {
    deleteExercise(_id: $id) {
      _id
    }
  }
`;
