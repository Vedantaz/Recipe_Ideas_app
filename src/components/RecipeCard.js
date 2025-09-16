import CustomImage from "./CustomImage";

export default function RecipeCard({ recipe, handleFilter, setQuery, query }) {
  return (
    <div className="recipe-card">
      <CustomImage imgSrc={recipe.image} pt="65%" />

      <div className="recipe-section">
        <p className="recipe-desc">{recipe.description}</p>

        <div className="recipe-ingredient">
          {recipe.ingredients.map((ingredient, index) => (
            <span
              key={index}
              onClick={() => setQuery(ingredient)}
              className={`ingredient-item ${
                query === ingredient ? "active" : ""
              }`}
            >
              {ingredient}
              {index < recipe.ingredients.length - 1 ? " " : ""}
            </span>
          ))}
        </div>

        <div className="recipe-info">
          <div className="info-card recipe-cuisine">
            Cuisine: <b>{recipe.cuisine}</b>
          </div>
          <div className="info-card recipe-difficulty">
            Time: <b>{recipe.time}</b>
          </div>
          <div className="info-card recipe-time">
            Difficulty: <b>{recipe.difficulty}</b>
          </div>
        </div>
      </div>
    </div>
  );
}
