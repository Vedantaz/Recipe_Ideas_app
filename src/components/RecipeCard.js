import CustomImage from "./CustomImage";
import { useState } from "react";

export default function RecipeCard({ recipe, setQuery, query }) {
  const [showModal, setShowModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showIngredientsModal, setShowIngredientsModal] = useState(false);
  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const ingredient = recipe[`strIngredient${i + 1}`];
    const measure = recipe[`strMeasure${i + 1}`];
    if (ingredient && ingredient.trim()) {
      return { ingredient, measure };
    }
    return null;
  }).filter(Boolean);

  const maxLength = 150;
  const descInstructions = recipe.strInstructions || "";
  const isLong = descInstructions.length > maxLength;
  const shortText = isLong
    ? descInstructions.slice(0, maxLength) + "..."
    : descInstructions;

  const maxInstructionsLength = 150;
  const measureInstructions = recipe.strInstructions || "";
  const isLongInstructions = measureInstructions.length > maxInstructionsLength;
  const shortInstructions = isLongInstructions
    ? measureInstructions.slice(0, maxInstructionsLength) + "..."
    : measureInstructions;

  const maxIngredientsToShow = 5;
  const isLongIngredients = ingredients.length > maxIngredientsToShow;
  const shortIngredients = isLongIngredients
    ? ingredients.slice(0, maxIngredientsToShow)
    : ingredients;

  return (
    <div className="recipe-card">
      <CustomImage imgSrc={recipe.strMealThumb} alt={recipe.strMeal} pt="65%" />

      <div className="recipe-section">
        <h1 className="recipe-heading ">{recipe.strMeal}</h1>
        <p className="recipe-desc">
          {shortText}
          {isLong && (
            <button
              className="read-more-btn"
              onClick={() => setShowModal(true)}
            >
              Read More
            </button>
          )}
        </p>

        <div className="recipe-ingredient">
          {shortIngredients.map(({ ingredient, measure }, index) => (
            <span
              key={index}
              onClick={() => setQuery(ingredient)}
              className={`ingredient-item ${
                query === ingredient ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
            >
              {ingredient} ({measure})
            </span>
          ))}

          {isLongIngredients && (
            <button
              className="read-more-btn"
              onClick={() => setShowIngredientsModal(true)}
            >
              Read More
            </button>
          )}
        </div>

        <div className="recipe-info">
          <div className="info-card recipe-cuisine">
            Cuisine: <b>{recipe.strArea || "Unknown"}</b>
          </div>
          <div className="info-card recipe-difficulty">
            Tags: <b>{recipe.strTags || "None"}</b>
          </div>
          <div className="info-card">
            <b className="title-measures">Measures used:</b>
            <ul className="measures-list">
              {ingredients.map(({ ingredient, measure }, index) => (
                <li key={index}>
                  {ingredient}: {measure}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{recipe.strMeal}</h3>
            <p>{descInstructions}</p>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      {showIngredientsModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowIngredientsModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{recipe.strMeal} - Ingredients</h3>
            <ul>
              {ingredients.map(({ ingredient, measure }, index) => (
                <li key={index}>
                  <span
                    onClick={() => setQuery(ingredient)}
                    className={`ingredient-item ${
                      query === ingredient ? "active" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    {ingredient}: {measure}
                  </span>
                </li>
              ))}
            </ul>
            <button
              className="close-btn"
              onClick={() => setShowIngredientsModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
