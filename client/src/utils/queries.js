import { gql } from '@apollo/client';

export const QUERY_ROUTINES = gql`
  query Query {
    me {
      routines {
        _id
        routineName
        createdAt
        userId
        exercises {
          _id
        }
      }
    }
  }
`;

export const QUERY_ROUTINE = gql`
  query Query($id: ID!) {
    routine(_id: $id) {
      _id
      routineName
      userId
      exercises {
        _id
        exerciseName
        exerciseCategory
      }
    }
  }
`;

// export const QUERY_USER = gql`
//   query user($username: String!) {
//     user(username: $username) {
//       _id
//       username
//       email
//       routines {
//         _id
//         routineName
//         createdAt
//       }
//     }
//   }
// `;

export const QUERY_ME = gql`
  query Query {
    me {
      _id
      username
      email
      routines {
        _id
        routineName
        createdAt
        userId
      }
      exercises {
        _id
        exerciseName
        exerciseCategory
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  query Query {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_EXERCISE = gql`
  query Exercise($id: ID!) {
    exercise(_id: $id) {
      _id
      exerciseName
      exerciseCategory
    }
  }
`;

export const QUERY_EXERCISES = gql`
  query Query {
    exercises {
      _id
      exerciseName
      exerciseCategory
    }
  }
`;
