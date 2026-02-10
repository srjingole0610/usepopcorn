import { useEffect, useRef } from "react";

export default function Search({ query, setQuery }) {
  // Step 1 - Create a ref
  const inputEl = useRef(null);
  // Step 3 - Use the ref
  useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [setQuery]);

  // //Not A react Way to do it
  // useEffect(() => {
  //   const el = document.querySelector(".search");
  //   console.log(el);
  //   el.focus();
  // }, []);

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
