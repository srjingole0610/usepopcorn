export default function Loader() {
  return (
    <div className='loader' role='status' aria-live='polite'>
      <span className='loader-spinner' aria-hidden='true' />
      <p className='loader-text'>Fetching movies</p>
      <span className='loader-subtext'>Please wait a moment</span>
    </div>
  );
}
