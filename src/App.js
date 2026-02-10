import { useEffect, useState } from "react";
import { API_KEY } from "./constants/api";
import Box from "./components/layout/Box";
import Main from "./components/layout/Main";
import NavBar from "./components/layout/NavBar";
import NumResults from "./components/layout/NumResults";
import Search from "./components/layout/Search";
import MovieDetails from "./components/movies/MovieDetails";
import MovieList from "./components/movies/MovieList";
import WatchedMovieList from "./components/movies/WatchedMovieList";
import WatchedSummary from "./components/movies/WatchedSummary";
import ErrorMessage from "./components/ui/ErrorMessage";
import Loader from "./components/ui/Loader";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(function () {
    const storedWatched = localStorage.getItem("wathched");
    return storedWatched ? JSON.parse(storedWatched) : [];
  });
  // const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");

  function handleSelectMovie(id) {
    setSelectedId((currentId) => (currentId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((currentWatched) => [...currentWatched, movie]);
    // localStorage.setItem("wathched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((currentWatched) =>
      currentWatched.filter((movie) => movie.imdbID !== id),
    );
  }

  useEffect(() => {
    localStorage.setItem("wathched", JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    const controller = new AbortController();
    const getMovies = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          { signal: controller.signal },
        );

        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies");
        }

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error("No movies found");
        }
        setMovies(data.Search);
        setError("");
      } catch (err) {
        // console.error(err.message);
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    handleCloseMovie();
    getMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
