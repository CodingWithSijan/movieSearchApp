import { useState } from "react";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=2de49fee";

const MovieSearchApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const searchMovies = async () => {
    if (!searchTerm) return;

    try {
      const response = await fetch(`${API_URL}&s=${searchTerm}`);
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
        setError(null);
      } else {
        setError(data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError("Something went wrong. Please try again later." + err);
    }
  };

  return (
    <div>
      <h1>Movie Search App</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.imbdID}>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/150"
              }
              alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearchApp;
