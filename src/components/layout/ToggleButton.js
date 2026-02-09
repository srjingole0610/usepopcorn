import { useState } from "react";

export default function ToggleButton({ isOpen: controlledIsOpen, onClick }) {
  const [isOpen, setIsOpen] = useState(true);
  const isControlled = controlledIsOpen !== undefined;
  const actualIsOpen = isControlled ? controlledIsOpen : isOpen;
  const handleClick = onClick ?? (() => setIsOpen((open) => !open));

  return (
    <button className='btn-toggle' onClick={handleClick}>
      {actualIsOpen ? "-" : "+"}
    </button>
  );
}
