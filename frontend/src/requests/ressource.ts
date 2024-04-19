import { gql } from "@apollo/client";

export const GET_ALL_RESSOURCES = gql`
  query GetAllRessources {
    getAllRessources {
        created_at
        created_by_user {
          id
          lastname
          firstname
          image_id {
            path
            id
            name
          }
        }
        image_id {
          path
          id
        }
        description
        file_id {
          id
          path
        }
        id
        is_favorite
        link_id {
          id
          url
        }
        title
      }
    }
  `;
