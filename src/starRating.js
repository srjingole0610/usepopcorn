import { useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * StarRating Component
 *
 * A reusable and accessible star rating component that allows users to rate items
 * by clicking on stars. Features hover effects and visual feedback.
 *
 * @param {Object} props - Component props
 * @param {number} [props.maxRating=5] - Maximum number of stars to display
 * @param {string} [props.color="#fcc419"] - Color of filled stars
 * @param {string} [props.size=48] - Size of each star in pixels
 * @param {string} [props.className=""] - Additional CSS class names
 * @param {Array} [props.messages=[]] - Custom messages to display for each rating
 * @param {number} [props.defaultRating=0] - Initial rating value
 * @param {Function} [props.onSetRating] - Callback function called when rating changes
 */
export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  // State for the actual selected rating
  const [rating, setRating] = useState(defaultRating);

  // State for temporary rating shown during hover
  const [tempRating, setTempRating] = useState(0);

  // Keep internal rating in sync when defaultRating changes (e.g. after async fetch)
  useEffect(() => {
    const nextRating = Number(defaultRating);
    setRating(Number.isFinite(nextRating) ? nextRating : 0);
  }, [defaultRating]);

  /**
   * Handles rating selection when a star is clicked
   * @param {number} newRating - The rating value to set (1-maxRating)
   */
  function handleRating(newRating) {
    setRating(newRating);

    // Call optional callback function if provided
    if (onSetRating) {
      onSetRating(newRating);
    }
  }

  /**
   * Gets the text to display next to the stars
   * Uses custom messages if provided, otherwise shows the numeric rating
   */
  function getDisplayText() {
    // Show temp rating during hover, otherwise show selected rating
    const currentRating = tempRating || rating;

    if (!Number.isFinite(currentRating) || currentRating === 0) {
      return "Not Rated";
    }

    // Use custom message if available, otherwise show number
    return messages.length === maxRating
      ? messages[currentRating - 1]
      : currentRating;
  }

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, index) => {
          const starNumber = index + 1;
          const currentRating = tempRating || rating;
          const fillPercentage = Math.max(
            0,
            Math.min(1, currentRating - (starNumber - 1)),
          );

          return (
            <Star
              key={starNumber}
              fillPercentage={fillPercentage}
              onRate={() => handleRating(starNumber)}
              onHoverIn={() => setTempRating(starNumber)}
              onHoverOut={() => setTempRating(0)}
              color={color}
              size={size}
            />
          );
        })}
      </div>

      <p style={{ ...textStyle, color }}>{getDisplayText()}</p>
    </div>
  );
}

/**
 * Star Component
 *
 * Individual star icon that can be clicked and hovered
 *
 * @param {Object} props - Component props
 * @param {Function} props.onRate - Callback when star is clicked
 * @param {boolean} props.full - Whether the star should be filled or empty
 * @param {Function} props.onHoverIn - Callback when mouse enters star
 * @param {Function} props.onHoverOut - Callback when mouse leaves star
 * @param {string} props.color - Fill color for the star
 * @param {number} props.size - Size of the star in pixels
 */
function Star({ onRate, fillPercentage, onHoverIn, onHoverOut, color, size }) {
  return (
    <span
      role='button'
      style={{
        ...starStyle,
        width: `${size}px`,
        height: `${size}px`,
      }}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      onKeyDown={(e) => {
        // Allow keyboard interaction (Enter or Space)
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onRate();
        }
      }}
      tabIndex={0}
      aria-label={`Rate star`}
    >
      <span style={starLayerStyle}>
        <EmptyStar color={color} size={size} />
      </span>
      <span
        style={{
          ...starLayerStyle,
          width: `${fillPercentage * 100}%`,
          overflow: "hidden",
        }}
      >
        <FullStar color={color} size={size} />
      </span>
    </span>
  );
}

/**
 * FullStar Component
 * SVG icon for a filled star
 */
function FullStar({ color, size }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      fill={color}
      stroke={color}
      width={size}
      height={size}
      style={svgStyle}
    >
      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
    </svg>
  );
}

/**
 * EmptyStar Component
 * SVG icon for an empty/outline star
 */
function EmptyStar({ color, size }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke={color}
      strokeWidth={2}
      width={size}
      height={size}
      style={svgStyle}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
      />
    </svg>
  );
}

// PropTypes for type checking and documentation
StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.string),
  defaultRating: PropTypes.number,
  onSetRating: PropTypes.func,
};

Star.propTypes = {
  onRate: PropTypes.func.isRequired,
  fillPercentage: PropTypes.number.isRequired,
  onHoverIn: PropTypes.func.isRequired,
  onHoverOut: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

FullStar.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

EmptyStar.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

// Inline styles (could be moved to CSS modules or styled-components)
const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

const textStyle = {
  lineHeight: "1",
  fontSize: "18px",
  margin: "0",
  fontWeight: "500",
};

const starStyle = {
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  transition: "all 0.2s",
};

const starLayerStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
};

const svgStyle = {
  display: "block",
};
