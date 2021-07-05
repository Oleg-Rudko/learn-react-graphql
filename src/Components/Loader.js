import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = ({ animation, variant, size }) => {
  return (
    <Spinner
      animation={animation}
      variant={variant}
      size={size}
    />
  );
};

export default Loader;
