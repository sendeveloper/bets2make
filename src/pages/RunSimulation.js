import React from 'react';
import { Container, Col, Row, Form } from 'react-bootstrap';
import MainHeader from '../components/Header';

class RunSimulation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onDoubleClick = (e, row, rowIndex) => {
    console.log(e, row, rowIndex);
  };

  onChange = (id, value) => {
    this.setState({ [id]: value });
  };

  render() {
    const { history } = this.props;
    return (
      <Container className="pageContainer">
        <MainHeader menus={[true, true, true]} history={history} />
        <Row className="dataFilter">
          <Col md={3} lg={2}>
            <Form.Label className="formLabel">RunSimulation:</Form.Label>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RunSimulation;
