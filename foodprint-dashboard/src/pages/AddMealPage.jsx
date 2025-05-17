import React, { useState } from "react";
import AddMealForm from "../components/AddMealForm";
import NutritionInfoCard from "../components/NutritionInfoCard";

const AddMealPage = () => {
  const [selectedFood, setSelectedFood] = useState(null);

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      <div style={{ flex: 2 }}>
        <AddMealForm setSelectedFood={setSelectedFood} />
      </div>
      <div style={{ flex: 1, marginLeft: "20px" }}>
        {selectedFood && <NutritionInfoCard food={selectedFood} />}
      </div>
    </div>
  );
};

export default AddMealPage;
