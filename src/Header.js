import React from 'react'
import { Navbar, Tooltip, Nav, OverlayTrigger } from 'react-bootstrap';

export default function Header() {

    const codeTooltip = (
        <Tooltip id="tooltip">
          <p>
            View raw code on Github
            </p>
        </Tooltip>
      )

    return (
    <div className="App">
      <Navbar bg="light" expand="lg" fixed="top" className="Navbar">
        <Nav.Link className="Nav">Marcus Bass</Nav.Link>
        <Nav.Link className="Nav">About Project</Nav.Link>
        <OverlayTrigger placement="bottom" overlay={codeTooltip}>
          <i class="fas fa-code fa-2x" id="code"></i>
        </OverlayTrigger>
      </Navbar>
    </div>
    )
}
