import { gql } from "@apollo/client";

export const GET_FOODS_BY_CATEGORY = gql`
  query GetFoods($category: String!) {
    foods(category: $category) {
      id
      name
      serving_size_g
      nutrition {
        calories
        fat
        protein
        sugar
        fiber
      }
    }
  }
`;
