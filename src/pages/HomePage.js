import React from 'react';
import {
  Container,
  Col,
  Row,
  Form,
  Alert,
  ButtonToolbar,
  Button
} from 'react-bootstrap';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';
import FormInlineComponent from '../components/FormInlineComponent';
import {
  LEAGUE,
  BETTING_STYLE,
  NUMBER_OF_STRATEGY,
  START_DATE,
  END_DATE,
  NUMBER_RULE_MIN,
  NUMBER_RULE_MAX,
  MIN_BETS,
  BET_AMOUNT,
  SIZING_MODEL,
  STARTING_MONEY,
  TREE_DATA
} from '../utils/constants';
import { loopTreeData } from '../utils/functions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      league: 0,
      betting: 0,
      strategy: 500,
      startDate: new Date('01/10/2006'),
      endDate: new Date(),
      numberRuleMin: 3,
      numberRuleMax: 5,
      minBets: 10,
      betAmount: 100,
      sizeModel: 0,
      startingMoney: 100000,

      expandedKeys: ['A'],
      autoExpandParent: true,
      checkedKeys: ['Boy'],
      selectedKeys: []
    };
  }

  generateArray = () => {
    const {
      betting,
      strategy,
      startDate,
      endDate,
      numberRuleMin,
      numberRuleMax,
      minBets,
      betAmount,
      sizeModel,
      startingMoney
    } = this.state;
    const arr = [
      { data: BETTING_STYLE, stateId: 'betting', value: betting },
      { data: NUMBER_OF_STRATEGY, stateId: 'strategy', value: strategy },
      { data: START_DATE, stateId: 'startDate', value: startDate },
      { data: END_DATE, stateId: 'endDate', value: endDate },
      { data: NUMBER_RULE_MIN, stateId: 'numberRuleMin', value: numberRuleMin },
      { data: NUMBER_RULE_MAX, stateId: 'numberRuleMax', value: numberRuleMax },
      { data: MIN_BETS, stateId: 'minBets', value: minBets },
      { data: BET_AMOUNT[sizeModel], stateId: 'betAmount', value: betAmount },
      { data: SIZING_MODEL, stateId: 'sizeModel', value: sizeModel },
      { data: STARTING_MONEY, stateId: 'startingMoney', value: startingMoney }
    ];
    return arr;
  };

  onChange = (type, value) => {
    const { sizeModel } = this.state;
    this.setState({ [type]: value });
    if (type === 'sizeModel' && sizeModel !== value) {
      this.setState({ betAmount: BET_AMOUNT[value].data.value });
    }
  };

  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded chilren keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
  };

  onCheck = checkedKeys => {
    this.setState({
      checkedKeys
    });
  };

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', selectedKeys, info);
    this.setState({
      selectedKeys
    });
  };

  render() {
    const {
      league,
      expandedKeys,
      autoExpandParent,
      checkedKeys,
      selectedKeys
    } = this.state;
    const formData = this.generateArray();

    return (
      <Container className="pageContainer">
        <Row>
          <Col md={3} sm={3}>
            <h1>Bets 2 Make</h1>
          </Col>
          <Col md={9} sm={9}>
            <ButtonToolbar className="menuButtonsContainer">
              <Button variant="link">Update Alerts</Button>
              <Button variant="link">Tonight Mode</Button>
              <Button variant="link">Run Simulation</Button>
              <Button variant="link">Modify Alerts Email</Button>
            </ButtonToolbar>
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={12}>
            <Row>
              <Col md={6}>
                <div className="chooseLeague">
                  <FormInlineComponent
                    data={LEAGUE}
                    stateId="league"
                    value={league}
                    onChange={this.onChange}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={6} sm={6}>
            <div className="inputParameters">
              <h2 className="componentTitle">Input Parameters</h2>
              <Form className="componentForm">
                {formData.map(each => (
                  <FormInlineComponent
                    key={each.stateId}
                    data={each.data}
                    stateId={each.stateId}
                    value={each.value}
                    onChange={this.onChange}
                  />
                ))}
                <Alert variant="info" className="infoAlert">
                  Please set your Alerts Email
                </Alert>
                <ButtonToolbar className="parameterButtonsContainer">
                  <Button variant="link">Show Portfolio</Button>
                  <Button variant="link">Calculators</Button>
                </ButtonToolbar>
              </Form>
            </div>
          </Col>
          <Col md={6} sm={6}>
            <div className="signals">
              <h2 className="componentTitle">
                Signals
                <span className="additional">
                  (right click to require signal)
                </span>
              </h2>
              <div className="componentForm">
                <Tree
                  checkable
                  onExpand={this.onExpand}
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onCheck={this.onCheck}
                  checkedKeys={checkedKeys}
                  onSelect={this.onSelect}
                  selectedKeys={selectedKeys}
                >
                  {loopTreeData(TREE_DATA)}
                </Tree>
                <ButtonToolbar className="parameterButtonsContainer">
                  <Button variant="link">Random 200</Button>
                  <Button variant="link">Random 500</Button>
                  <Button variant="link">Clear</Button>
                </ButtonToolbar>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HomePage;
