/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import StarRating from "../../starRating";
import { API_KEY } from "../../constants/api";
import Loader from "../ui/Loader";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) {
      countRef.current = countRef.current + 1;
    }
    console.log(countRef);
  }, [userRating]);

  const isWatched = watched.map((entry) => entry.imdbID).includes(selectedId);
  const watchedUserRating =
    watched.find((entry) => entry.imdbID === selectedId)?.userRating || "";

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // const [isTop, setIsTop] = useState(imdbRating > 8);
  // console.log(isTop);

  // useEffect(() => {
  //   setIsTop(imdbRating > 8);
  // }, [imdbRating]);

  // const isTop = imdbRating > 8;
  // console.log(isTop);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`,
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    };

    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn";
      // console.log(`cleanup effect for movie ${title}`);
    };
  }, [title]);

  useEffect(() => {
    const callback = (e) => {
      if (e.key === "Escape") {
        onCloseMovie();
      }
    };
    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, []);

  // const [avgRating, setAvgRating] = useState(0);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    // setAvgRating(Number(imdbRating));
    // // alert(avgRating);
    // setAvgRating((avgRating) => (avgRating + Number(userRating)) / 2);
    onCloseMovie();
  }

  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className='btn-back' onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`${title} poster`} />
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>&#11088;</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          {/* <p>{avgRating}</p> */}

          <section>
            <div className='rating'>
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={22}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className='btn-add' onClick={handleAdd}>
                      Add to watched List
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie {watchedUserRating} <span>&#11088;</span>
                </p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>
              <strong>Starring:</strong> {actors}
            </p>
            <p>
              <strong>Directed by:</strong> {director}
            </p>
          </section>
        </>
      )}
    </div>
  );
}
