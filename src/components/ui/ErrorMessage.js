export default function ErrorMessage({ message }) {
  return (
    <p className='error'>
      <span>&#9940;</span>
      <span>{message}</span>
    </p>
  );
}
