import React from "react";
import { Spinner } from "react-bootstrap";

export const Loader = () => <Spinner animation="border" variant="success" />;

export const LoaderSm = () => <Spinner animation="border" variant="info" size="sm" />;

export const Loading = () => {
  return (
    <>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      <span>Loading...</span>
    </>
  );
};
