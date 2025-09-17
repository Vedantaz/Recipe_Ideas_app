import PreviousSearches from "../components/PreviousSearches";
import RecipeCard from "../components/RecipeCard";
import { useState, useEffect } from "react";

export default function Recipes() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [exclude, setExclude] = useState("");

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.meals) {
          let meals = data.meals;
          if (exclude) {
            meals = meals.filter((meal) => {
              const ingredients = Array.from(
                { length: 20 },
                (_, i) => meal[`strIngredient${i + 1}`]
              ).filter(Boolean);
              return !ingredients.some((ing) =>
                ing.toLowerCase().includes(exclude.toLowerCase())
              );
            });
          }
          setRecipes(meals);
        } else {
          setRecipes([]);
        }
      });
  }, [query, exclude]);

  return (
    <div>
      <PreviousSearches
        query={query}
        setQuery={setQuery}
        exclude={exclude}
        setExclude={setExclude}
      />
      <div className="recipes-container">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            setQuery={setQuery}
            query={query}
          />
        ))}
      </div>
    </div>
  );
}
