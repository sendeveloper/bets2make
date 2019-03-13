import React from 'react';
import { Container, Col, Row, Form } from 'react-bootstrap';
import FormInlineComponent from '../components/FormInlineComponent';
import {
  LEAGUE,
  BETTING_STYLE,
  NUMBER_OF_STRATEGY,
  START_DATE
} from '../utils/constants';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      league: 0,
      betting: 0,
      strategy: 500,
      startDate: new Date()
      // endDate: "",
    };
  }

  onChange = (type, value) => {
    console.log(type, value);
    this.setState({ [type]: value });
  };

  render() {
    const { league, betting, strategy, startDate } = this.state;
    return (
      <Container>
        <h1>Bets 2 Make</h1>
        <Row>
          <Col md={12} sm={12}>
            <Row>
              <Col md={6}>
                <FormInlineComponent
                  data={LEAGUE}
                  stateId="league"
                  value={league}
                  onChange={this.onChange}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={6} sm={6}>
            <div className="inputParameters">
              <h2 className="componentTitle">Input Parameters</h2>
              <Form>
                <FormInlineComponent
                  data={BETTING_STYLE}
                  stateId="betting"
                  value={betting}
                  onChange={this.onChange}
                />
                <FormInlineComponent
                  data={NUMBER_OF_STRATEGY}
                  stateId="strategy"
                  value={strategy}
                  onChange={this.onChange}
                />
                <FormInlineComponent
                  data={START_DATE}
                  stateId="startDate"
                  value={startDate}
                  onChange={this.onChange}
                />
              </Form>
            </div>
          </Col>
          <Col md={6} sm={6}>
            <div className="signals">
              <h2 className="componentTitle">Signals</h2>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HomePage;
