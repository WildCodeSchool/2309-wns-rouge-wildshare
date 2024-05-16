import { gql } from "@apollo/client";

export const GET_RESSOURCES_BY_GROUP_ID = gql`
query GetRessourcesByGroupId($groupId: ID!) {
  getRessourcesByGroupId(groupId: $groupId) {
    id
    title
    description
    is_favorite
    image_id {
      id
      path
      name
    }
    created_by_user {
      id
      lastname
      firstname
      image_id {
        id
        name
        path
      }
    }
    group_id {
      id
    }
  }
}
`;
