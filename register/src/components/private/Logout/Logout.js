import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Logout = ({ setIsLoggedIn }) => {
  const [showConfirmation, setShowConfirmation] = useState(true);
  const history = useHistory();

  const handleConfirm = () => {
    // Handle confirm action
    // ...
    // Close the confirmation box
    // setIsLoggedIn(false);
    // sessionStorage.setItem('isLoggedIn',false)
    sessionStorage.removeItem('isLoggedIn');

    setShowConfirmation(false);
  };

  const handleClose = () => {
    history.goBack();
    // Close the confirmation box without taking any action
    setShowConfirmation(false);
  };

  return (
    <div>
      {/* Button to trigger the confirmation box */}
      {/* <Button variant="primary" onClick={() => setShowConfirmation(true)}>
        Show Confirmation
      </Button> */}

      {/* Confirmation box */}
      <Modal show={showConfirmation} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to proceed?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm} href='/'>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Logout;


