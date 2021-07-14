import React, { useState } from "react";
import { BoxArrowInRight } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

const Logout = () => {
  const [show, setShow] = useState(false);
  const history = useHistory();

  const logout = () => {
    window.localStorage.removeItem("user_id");
    window.localStorage.removeItem("isAuth");
    history.push({ pathname: "/" });
  };

  return (
    <>
      <button className="logoutBtn" onClick={() => setShow(true)}>
        <BoxArrowInRight color="#fff" size="40" />
      </button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to exit?</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShow(false)}>
            No
          </Button>
          <Button onClick={logout} variant="secondary">
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Logout;
