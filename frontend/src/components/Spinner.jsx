import React from "react";

const Spinner = ({ color }) => {
  return (
    <div className="flex space-x-1 items-center justify-center h-8">
      <span className={`w-1 h-1 bg-${color} rounded-full animate-ping`}></span>
      <span
        className={`w-1 h-1 bg-${color} rounded-full animate-ping`}
        style={{ animationDelay: "0.15s" }}
      ></span>
      <span
        className={`w-1 h-1 bg-${color} rounded-full animate-ping`}
        style={{ animationDelay: "0.3s" }}
      ></span>
    </div>
  );
};

export default Spinner;
