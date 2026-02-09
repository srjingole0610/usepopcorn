import WatchedMovie from "./WatchedMovie";

export default function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className='list list-watched'>
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
