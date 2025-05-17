import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_FOODS_BY_CATEGORY } from "../gql/queries";

const categories = ["fruits", "vegetables", "indian_foods", "american_foods"];

const AddMealForm = ({ setSelectedFood }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allFoods, setAllFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);

  const [fetchFoods] = useLazyQuery(GET_FOODS_BY_CATEGORY, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    const fetchAll = async () => {
      let foods = [];

      for (const category of categories) {
        const result = await fetchFoods({ variables: { category } });
        if (result?.data?.foods) {
          foods = [...foods, ...result.data.foods];
        }
      }

      // ✅ Deduplicate by food name (case-insensitive)
      const deduplicated = Array.from(
        new Map(
          foods.map((food) => [food.name.toLowerCase(), food]) // key = name.toLowerCase()
        ).values()
      );

      setAllFoods(deduplicated);
    };

    fetchAll();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const results = allFoods.filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFoods(results);
  }, [searchTerm, allFoods]);

  const handleSelect = (food) => {
    setSelectedFood(food);
    setSearchTerm(food.name); // Optional: fill search input with selected food
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <h2>Add Meal</h2>

      <input
        type="text"
        placeholder="Search any food..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {filteredFoods.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            paddingLeft: 0,
            maxHeight: "200px",
            overflowY: "auto",
            border: "1px solid #eee",
            borderRadius: "5px",
            marginTop: "5px",
            backgroundColor: "#fafafa",
          }}
        >
          {filteredFoods.map((food) => (
            <li
              key={food.id}
              onClick={() => handleSelect(food)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #ddd",
              }}
            >
              {food.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddMealForm;
