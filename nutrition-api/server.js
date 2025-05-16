const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const fs = require("fs");

// Load schema from file
const typeDefs = gql(fs.readFileSync("./schema.graphql", "utf8"));

// Resolvers with data fetching and transformation
const resolvers = {
  Query: {
    // Original API data (with carbs)
    foods: async (_, { category }) => {
      try {
        const response = await axios.get("http://localhost:8000/foods");
        return response.data[category] || [];
      } catch (error) {
        throw new Error(`Failed to fetch foods: ${error.message}`);
      }
    },

    // Low-carb version (carbs excluded)
    lowCarbFoods: async (_, { category }) => {
      try {
        const response = await axios.get("http://localhost:8000/foods");
        const items = response.data[category] || [];

        return items.map((item) => ({
          ...item,
          nutrition: {
            calories: item.nutrition.calories,
            fat: item.nutrition.fat,
            protein: item.nutrition.protein,
            sugar: item.nutrition.sugar,
            fiber: item.nutrition.fiber,
            // carbohydrates intentionally omitted
          },
        }));
      } catch (error) {
        throw new Error(`Failed to fetch low-carb foods: ${error.message}`);
      }
    },
  },
};

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // Enable for development
  playground: true, // Enable GraphQL Playground
});

// Start server
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
