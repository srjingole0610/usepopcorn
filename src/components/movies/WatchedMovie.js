export default function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>&#11088;</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>&#127775;</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>&#9203;</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className='btn-delete'
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
