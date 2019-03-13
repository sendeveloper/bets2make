import React from 'react';
import { Container, Col, Row, Form } from 'react-bootstrap';
import FormInlineComponent from '../components/FormInlineComponent';
import {
  LEAGUE,
  BETTING_STYLE,
  NUMBER_OF_STRATEGY,
  START_DATE,
  END_DATE,
  NUMBER_RULE_MIN,
  NUMBER_RULE_MAX
} from '../utils/constants';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      league: 0,
      betting: 0,
      strategy: 500,
      startDate: new Date('01/10/2006'),
      endDate: new Date(),
      numberRuleMin: 1,
      numberRuleMax: 5
    };
  }

  onChange = (type, value) => {
    this.setState({ [type]: value });
  };

  render() {
    const {
      league,
      betting,
      strategy,
      startDate,
      endDate,
      numberRuleMin,
      numberRuleMax
    } = this.state;
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
                <FormInlineComponent
                  data={END_DATE}
                  stateId="endDate"
                  value={endDate}
                  onChange={this.onChange}
                />
                <FormInlineComponent
                  data={NUMBER_RULE_MIN}
                  stateId="numberRuleMin"
                  value={numberRuleMin}
                  onChange={this.onChange}
                />
                <FormInlineComponent
                  data={NUMBER_RULE_MAX}
                  stateId="numberRuleMax"
                  value={numberRuleMax}
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
