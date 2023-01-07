import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="loading-container">
      <span>
        <FaSpinner color="#61dafb" fontSize={100} />
      </span>
    </div>
  );
};

export default Loading;
