import React, { useState } from 'react';

function Button({
    children,
    type = "button",
    bgColor = "linear-gradient(to right, #24C6DC, #514A9D)",
    textColor = "text-white",
    className = "",
    ...props
}) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 200); // Reset clicked state after 200ms
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg ${textColor} ${className}`}
      style={{
        background: bgColor,
        border: clicked ? "4px solid #43C6AC" : "none",
        transition: "border 0.2s ease",
        ...(hovered && { border: "2px solid #000" }), // Apply border when hovered
      }}
      type={type}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...props}
    >
      {children}
        </button>
  );
}

export default Button;
