import { average } from "../../utils/average";

export default function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className='summary'>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>&#35;&#65039;&#8419;</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>&#11088;</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>&#127775;</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>&#9203;</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
