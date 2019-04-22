import React from "react";

const Progress = ({ size, className }) => (
  <img
    src="/images/loading-boxes.gif"
    alt="progress"
    className={className}
    style={{ height: `${size}px`, width: `${size}px` }}
  />
);

export default Progress;
