import { useState } from "react";

function Description({ description }) {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const truncatedDescription = description.substring(0, 201); // Adjust the limit as needed

  return (
    <div>
      <p
        className={`text-white mt-4 text-base md:text-lg lg:text-xl ${
          expanded ? "overflow-visible" : "overflow-hidden"
        }`}
        style={{
          maxHeight: expanded ? "none" : "2.4em",
          WebkitLineClamp: "2",
          WebkitBoxOrient: "vertical",
        }}
      >
        {expanded ? description : truncatedDescription}
      </p>
      {description.length > 200 && (
        <button
          onClick={toggleDescription}
          className="text-white mt-2 bg-[#AE7AFF] px-4 py-1 rounded-md"
        >
          {expanded ? "Show Less" : "Show more"}
        </button>
      )}
    </div>
  );
}

export default Description;
