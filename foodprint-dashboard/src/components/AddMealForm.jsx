// src/components/AddMealForm.jsx

import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_FOODS_BY_CATEGORY } from "../gql/queries";
import "./AddMealForm.css"; // ✅ Import the CSS

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

      const deduplicated = Array.from(
        new Map(foods.map((food) => [food.name.toLowerCase(), food])).values()
      );

      setAllFoods(deduplicated);
    };

    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredFoods([]);
    } else {
      const results = allFoods.filter((food) =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFoods(results);
    }
  }, [searchTerm, allFoods]);

  const handleSelect = (food) => {
    setSelectedFood(food);
    setSearchTerm("");
    setFilteredFoods([]);
  };

  return (
    <div className="meal-form-container">
      <h2>Add Meal</h2>

      <input
        type="text"
        placeholder="Search any food..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="meal-input"
      />

      {searchTerm && filteredFoods.length > 0 && (
        <ul className="suggestion-list">
          {filteredFoods.map((food) => (
            <li
              key={food.id}
              onClick={() => handleSelect(food)}
              className="suggestion-item"
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
