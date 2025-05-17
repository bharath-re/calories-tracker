import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_FOODS_BY_CATEGORY } from "../gql/queries";
const categories = ["fruits", "vegetables", "indian_foods", "american_foods"];

const AddMealForm = ({ setSelectedFood }) => {
  const [category, setCategory] = useState("fruits");
  const [searchTerm, setSearchTerm] = useState("");
  const [foodOptions, setFoodOptions] = useState([]);
  const { loading, error, data } = useQuery(GET_FOODS_BY_CATEGORY, {
    variables: { category },
  });

  useEffect(() => {
    if (data?.foods) {
      setFoodOptions(data.foods);
    }
  }, [data]);

  const handleSelect = (food) => {
    setSelectedFood(food);
  };

  const filteredOptions = foodOptions.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2>Add Meal</h2>
      <div>
        <label>Category: </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Search Food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", width: "100%" }}
        />
        {filteredOptions.length > 0 && (
          <ul
            style={{
              listStyle: "none",
              paddingLeft: 0,
              maxHeight: "200px",
              overflowY: "auto",
              border: "1px solid #eee",
              marginTop: "5px",
            }}
          >
            {filteredOptions.map((food) => (
              <li
                key={food.id}
                onClick={() => handleSelect(food)}
                style={{
                  padding: "5px",
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
    </div>
  );
};

export default AddMealForm;
