import PreviousSearches from "../components/PreviousSearches";
import RecipeCard from "../components/RecipeCard";
import { useState, useEffect } from "react";

export default function Recipes({ query, setQuery }) {
  const recipes = [
    {
      id: 1,
      title: "Chicken Pan Pizza",
      image: "/img/gallery/img_1.jpg",
      authorImg: "/img/top-chiefs/img_1.jpg",
      description:
        "A cheesy pan pizza topped with spicy chicken and fresh veggies.",
      ingredients: ["chicken", "cheese", "capsicum", "onion"],
      cuisine: "Italian",
      time: "30 mins",
      difficulty: "Easy",
    },
    {
      id: 2,
      title: "Paneer Butter Masala",
      image: "/img/gallery/img_2.jpg",
      authorImg: "/img/top-chiefs/img_2.jpg",
      description:
        "Creamy and rich paneer curry cooked in tomato and butter sauce.",
      ingredients: ["paneer", "butter", "tomato", "cream"],
      cuisine: "Indian",
      time: "40 mins",
      difficulty: "Medium",
    },
    {
      id: 3,
      title: "Egg Fried Rice",
      image: "/img/gallery/img_3.jpg",
      authorImg: "/img/top-chiefs/img_3.jpg",
      description:
        "Quick fried rice with scrambled eggs, soy sauce, and veggies.",
      ingredients: ["egg", "rice", "carrot", "spring onion"],
      cuisine: "Chinese",
      time: "20 mins",
      difficulty: "Easy",
    },
    {
      id: 4,
      title: "Chicken Biryani",
      image: "/img/gallery/img_6.jpg",
      authorImg: "/img/top-chiefs/img_5.jpg",
      description:
        "Fragrant basmati rice layered with spiced chicken and herbs.",
      ingredients: ["chicken", "rice", "yogurt", "spices"],
      cuisine: "Indian",
      time: "1 hr",
      difficulty: "Hard",
    },
    {
      id: 5,
      title: "Paneer Tikka",
      image: "/img/gallery/img_7.jpg",
      authorImg: "/img/top-chiefs/img_6.jpg",
      description: "Grilled paneer cubes marinated in spiced yogurt.",
      ingredients: ["paneer", "yogurt", "capsicum", "onion"],
      cuisine: "Indian",
      time: "25 mins",
      difficulty: "Medium",
    },
  ].sort(() => Math.random() - 0.5);

  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  const handleFilter = (query) => {
    const q = query.toLowerCase();
    const filteredData = recipes.filter((receipe) => {
      return (
        receipe.title.toLowerCase().includes(q) ||
        receipe.ingredients.some((ingredient) => {
          ingredient.toLowerCase().includes(q);
        }) ||
        receipe.cuisine.toLowerCase().includes(q)
      );
    });
    setFilteredRecipes(filteredData);
  };

  useEffect(() => {
    if (query && query.trim() !== "") {
      handleFilter(query);
    } else {
      setFilteredRecipes(recipes);
    }
  }, [query]);

  return (
    <div>
      <PreviousSearches query={query} setQuery={setQuery} />
      <div className="recipes-container">
        {(query && query.trim() !== "" ? filteredRecipes : recipes).map(
          (recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              handleFilter={handleFilter}
              setQuery={setQuery}
              query={query}
            />
          )
        )}
      </div>
    </div>
  );
}
