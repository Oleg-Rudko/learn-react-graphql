import React from "react";
import { Spinner } from "react-bootstrap";

export const Loader = () => {
  return <Spinner animation="border" variant="success" />;
};

export const LoaderSm = () => {
  return <Spinner animation="border" variant="info" size="sm" />;
}
