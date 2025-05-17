import React from "react";

const NutritionInfoCard = ({ food }) => {
  const { nutrition } = food;

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h3>Nutrition Info</h3>
      <p>
        <strong>Food:</strong> {food.name}
      </p>
      <p>
        <strong>Serving Size:</strong> {food.serving_size_g}g
      </p>
      <p>
        <strong>Calories:</strong> {nutrition.calories} kcal
      </p>
      <p>
        <strong>Protein:</strong> {nutrition.protein}g
      </p>
      <p>
        <strong>Fat:</strong> {nutrition.fat}g
      </p>
      <p>
        <strong>Sugar:</strong> {nutrition.sugar}g
      </p>
      <p>
        <strong>Fiber:</strong> {nutrition.fiber}g
      </p>
    </div>
  );
};

export default NutritionInfoCard;
