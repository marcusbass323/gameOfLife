import React, { useState } from 'react'
import { Navbar, Tooltip, Nav, OverlayTrigger, Modal, Button } from 'react-bootstrap';

export default function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const codeTooltip = (
    <Tooltip id="tooltip">
      <p>
        View raw code on Github
      </p>
    </Tooltip>
  )

  return (
    <div>
      <div>
        <Navbar bg="light" expand="lg" fixed="top" className="Navbar">
          <Nav.Link className="Nav">Marcus Bass</Nav.Link>
          <Nav.Link className="Nav" onClick={handleShow}>About Project</Nav.Link>
          <OverlayTrigger placement="right" overlay={codeTooltip}>
            <a target="_blank" href="https://github.com/marcusbass323/gameOfLife"><i class="fas fa-code fa-2x" id="code"></i></a>
          </OverlayTrigger>
        </Navbar>

          <Modal show={show} onHide={handleClose} centered="true" animation="true">
            <Modal.Header closeButton>
              <Modal.Title>About this project:</Modal.Title>
            </Modal.Header>
            <Modal.Body>An application built with React.js which allows users to run different "Game of Life" scenarios.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
          </Button>
            </Modal.Footer>
          </Modal>
      </div>
    </div>
  )
}
