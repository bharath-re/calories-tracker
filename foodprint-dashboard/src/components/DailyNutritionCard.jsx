import React from "react";
import "./DailyNutritionCard.css";

const DailyNutritionCard = () => {
  return (
    <div className="daily-card">
      <p className="daily-title">
        This is basic Nutrition value for 80 kgs and 5.10 height
      </p>

      <div className="daily-row">
        <span className="daily-label">Calories</span>
        <span className="daily-value bold">320 kcal</span>
      </div>
      <div className="daily-bar-bg">
        <div className="daily-bar-fill" style={{ width: "65%" }}></div>
      </div>

      <div className="daily-row">
        <span className="daily-label">Protein</span>
        <span className="daily-value">8g</span>
      </div>

      <div className="daily-row">
        <span className="daily-label">Fats</span>
        <span className="daily-value">7g</span>
      </div>

      <div className="daily-row">
        <span className="daily-label">Fiber</span>
        <span className="daily-value">6g</span>
      </div>

      <div className="daily-row">
        <span className="daily-label">Sugars</span>
        <span className="daily-value">52g</span>
      </div>
    </div>
  );
};

export default DailyNutritionCard;
