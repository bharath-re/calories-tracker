import React, { useState } from "react";
import AddMealForm from "./components/AddMealForm";
import NutritionInfoCard from "./components/NutritionInfoCard";
import DailyNutritionCard from "./components/DailyNutritionCard"; // ✅ Import here
import "./App.css";

const App = () => {
  const [selectedFood, setSelectedFood] = useState(null);

  return (
    <div className="app-container">
      <div className="card-box">
        <AddMealForm setSelectedFood={setSelectedFood} />
      </div>

      {selectedFood && (
        <div className="card-box">
          <NutritionInfoCard food={selectedFood} />
        </div>
      )}

      <div className="card-box">
        <DailyNutritionCard />
      </div>
    </div>
  );
};

export default App;
