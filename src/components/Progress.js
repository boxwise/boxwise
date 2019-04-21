import React from "react";
import PropTypes from "prop-types";

const Progress = ({ size, className }) => (
  <img
    src="/images/loading-boxes.gif"
    alt="progress"
    className={className}
    style={{ height: `${size}px`, width: `${size}px` }}
  />
);

Progress.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string
};

Progress.defaultProps = {
  size: 40,
  className: ""
};

export default Progress;
