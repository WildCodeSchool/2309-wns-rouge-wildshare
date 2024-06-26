import { gql } from "@apollo/client";

export const CREATE_GROUP = gql`
  mutation createGroup($data: GroupInput!) {
    createGroup(data: $data) {
      name
      description
      id
    }
  }
`;

export const GET_MY_GROUPS = gql`
  query getMyGroups {
    items: getMyGroups {
      id
      name
      description
      created_at
      created_by_user {
        id
        firstname
        lastname
      }
    }
  }
`;

export const GET_ONE_GROUP = gql`
  query GetOneGroup($id: ID!) {
    item: getOneGroup(id: $id) {
      id
      name
      description
      created_at
    }
  }
`;
