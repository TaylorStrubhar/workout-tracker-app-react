import { gql } from '@apollo/client';

export const QUERY_ROUTINES = gql`
  query routines($username: String) {
    routines(username: $username) {
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

export const QUERY_ROUTINE = gql`
  query routine($id: ID!) {
    routine(_id: $id) {
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

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      routines {
        _id
        routineName
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      routines {
        _id
        routineName
        createdAt
        exercises {
          _id
        }
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;