import React from "react";
import "./NutritionInfoCard.css";

const Bar = ({ label, value, maxValue, unit }) => {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div className="nutrition-bar">
      <div className="nutrition-label-row">
        <span className="nutrition-label">{label}</span>
        <span className="nutrition-value">
          {value}
          {unit}
        </span>
      </div>
      <div className="nutrition-bar-bg">
        <div
          className="nutrition-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const NutritionInfoCard = ({ food }) => {
  const { nutrition } = food;

  return (
    <div className="nutrition-card">
      <h3>Nutrition Info</h3>
      <Bar
        label="Calories"
        value={nutrition.calories}
        maxValue={500}
        unit="kcal"
      />
      <Bar label="Protein" value={nutrition.protein} maxValue={50} unit="g" />
      <Bar label="Fats" value={nutrition.fat} maxValue={50} unit="g" />
      <Bar label="Fiber" value={nutrition.fiber} maxValue={30} unit="g" />
    </div>
  );
};

export default NutritionInfoCard;
