import PropTypes from "prop-types";
import { useState } from "react";

export function Tabs({ TabNames }) {
  const [Tab, SetTab] = useState("");
  return (
    <div>
      <div className="bg-white grid grid-flow-col absolute top-[45%] w-full justify-around ">
        {TabNames.map((el) => (
          <div
            className="text-red-500 hover:bg-green-200 "
            key={el}
            onClick={() => SetTab(el)}
          >
            {el}
          </div>
        ))}
      </div>
      <div className="absolute bottom-10 w-full">{Tab}</div>
    </div>
  );
}

Tabs.propTypes = {
  TabNames: PropTypes.array.isRequired,
};
