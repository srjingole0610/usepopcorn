import { useEffect, useRef } from "react";
import { useKey } from "../../hooks/useKey";

export default function Search({ query, setQuery }) {
  // Step 1 - Create a ref
  const inputEl = useRef(null);
  // Step 3 - Use the ref

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });
  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl} // Step 2 - Attach the ref
    />
  );
}
