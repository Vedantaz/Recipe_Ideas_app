import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function PreviousSearches({
  query,
  setQuery,
  exclude,
  setExclude,
}) {
  const searches = [
    "pizza",
    "burger",
    "cookies",
    "juice",
    "biriyani",
    "salad",
    "ice cream",
    "lasagna",
    "pudding",
    "soup",
  ];

  return (
    <div className="previous-searches section">
      <h2>Previous Searches</h2>
      <div className="previous-searches-container">
        {searches.map((search, index) => (
          <div
            key={index}
            style={{ animationDelay: index * 0.1 + "s" }}
            className="search-item"
            onClick={() => setQuery(search)}
          >
            {search}
          </div>
        ))}
      </div>
      <div className="search-box">
        <input
          type="text"
          value={query}
          placeholder="What do you want to cook..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="exclude-section">
          <input
            type="text"
            placeholder="Exclude (e.g. egg)"
            value={exclude}
            onChange={(e) => setExclude(e.target.value)}
          />
        </div>
        <button className="btn">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
}
