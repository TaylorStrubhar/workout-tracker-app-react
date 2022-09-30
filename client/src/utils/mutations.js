import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
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
      exercise {
        _id
      }
    }
  }
`;

export const ADD_EXERCISE = gql`
  mutation addExercise($routineId: ID!, $exerciseName: String!) {
    addExercise(routineId: $routineId, exerciseName: $exerciseName) {
        _id
        exercises {
            _id
            exerciseName
        }
    }
  }
`;