import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, ButtonToolbar, Button } from 'react-bootstrap';

class Header extends React.Component {
  render() {
    const { onUpdate, onTonight, onRun, onAlert, menus } = this.props;
    return (
      <Row>
        <Col md={3}>
          <Link to="/" className="logo">
            <h1>Bets 2 Make</h1>
          </Link>
        </Col>
        <Col md={9}>
          <ButtonToolbar className="menuButtonsContainer">
            {menus[0] && (
              <Button variant="link" onClick={onUpdate && onUpdate}>
                Update Alerts
              </Button>
            )}
            {menus[1] && (
              <Button variant="link" onClick={onTonight && onTonight}>
                Tonight Mode
              </Button>
            )}
            {menus[2] && (
              <Button variant="link" onClick={onRun && onRun}>
                Run Simulation
              </Button>
            )}
            {menus[3] && (
              <Button variant="link" onClick={onAlert && onAlert}>
                Modify Alerts Email
              </Button>
            )}
          </ButtonToolbar>
        </Col>
      </Row>
    );
  }
}

export default Header;
