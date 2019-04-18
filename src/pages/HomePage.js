import React from 'react';
import {
  Container,
  Col,
  Row,
  Form,
  Alert,
  ButtonToolbar,
  Button,
  Modal
} from 'react-bootstrap';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';
import CalculatorModal from '../components/CalculatorModal';
import FormInlineComponent from '../components/FormInlineComponent';
import MainHeader from '../components/Header';
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
  // FILE_NAMES
} from '../utils/constants';
import { loopTreeData, initialStrategyParameters } from '../utils/functions';

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

      autoExpandParent: true,
      expandedKeys: [],
      checkedKeys: [],

      alertEmail: '',
      modalEmailText: '',
      isOpenEmailModal: false,

      isOpenCalculatorModal: false
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
    const { league, sizeModel } = this.state;
    this.setState({ [type]: value });
    if (type === 'league' && league !== value) {
      this.setState({ expandedKeys: [], checkedKeys: [] });
    }
    if (type === 'sizeModel' && sizeModel !== value) {
      this.setState({ betAmount: BET_AMOUNT[value].data.value });
    }
  };

  onExpand = expandedKeys => {
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

  generateSignal = count => {
    if (count === 0) {
      this.setState({
        checkedKeys: [],
        expandedKeys: [],
        autoExpandParent: true
      });
    } else if (count < 0) {
      // error
    } else {
      const { league } = this.state;
      const str = TREE_DATA[league].split('|');
      let array = [];
      const expanded = [];
      const treeArray = [];
      // eslint-disable-next-line
      str.map(item => {
        const itemArray = item.split(';');
        treeArray.push(itemArray);
        array = [...array, ...itemArray.slice(1)];
      });
      const shuffled = array.sort(() => 0.5 - Math.random());
      const checked = shuffled.slice(0, count);
      // eslint-disable-next-line
      checked.map(each => {
        // eslint-disable-next-line
        treeArray.map(treeEach => {
          const index = treeEach.indexOf(each);
          if (index !== -1 && expanded.indexOf(treeEach[0]) === -1) {
            expanded.push(treeEach[0]);
          }
        });
      });
      this.setState({
        checkedKeys: checked,
        expandedKeys: expanded,
        autoExpandParent: true
      });
    }
  };

  acceptAlertModal = () => {
    const { modalEmailText } = this.state;
    this.setState({ alertEmail: modalEmailText, isOpenEmailModal: false });
  };

  closeAlertModal = () => {
    this.setState({ isOpenEmailModal: false });
  };

  openAlertModal = () => {
    const { alertEmail } = this.state;
    this.setState({ isOpenEmailModal: true, modalEmailText: alertEmail });
  };

  onChangeInput = e => {
    this.setState({ modalEmailText: e.target.value });
  };

  showEmailModal = () => {
    const { isOpenEmailModal, modalEmailText } = this.state;
    return (
      <Modal show={isOpenEmailModal} onHide={this.closeAlertModal}>
        <Modal.Header closeButton>
          <Modal.Title>Change Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Input the email where you want to receive notifications <br />
            (Leave blank to deactivate notifications)
          </p>
          <Form.Control
            type="text"
            placeholder="Email Address"
            value={modalEmailText}
            onChange={e => this.onChangeInput(e)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeAlertModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.acceptAlertModal}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  onCalcModalChange = b => {
    this.setState({ isOpenCalculatorModal: b });
  };

  onRunSimulation = () => {
    const {
      strategy,
      numberRuleMin,
      numberRuleMax,
      startDate,
      endDate,
      checkedKeys,
      betting,
      league,
      minBets,
      sizeModel,
      betAmount,
      startingMoney
    } = this.state;
    const { history } = this.props;

    const cfg = {};
    cfg.numStrategies = Number.parseInt(strategy, 10);
    if (
      Number.parseInt(numberRuleMax, 10) < Number.parseInt(numberRuleMin, 10)
    ) {
      alert('Please select correct min and max rules.');
      return;
    }
    if (checkedKeys.length < numberRuleMin) {
      alert('Please select more rules.');
      return;
    }
    if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
      alert('Please check start and end dates.');
      return;
    }
    cfg.testsPerGeneration = 50;
    cfg.minNumOfRules = Number.parseInt(numberRuleMin, 10);
    cfg.maxNumOfRules = Number.parseInt(numberRuleMax, 10);
    cfg.strategyParameters = initialStrategyParameters();
    cfg.strategyParameters.betStyle = betting;
    cfg.strategyParameters.startDate = startDate;
    cfg.strategyParameters.endDate = endDate;
    cfg.strategyParameters.gametype = league;
    cfg.minBets = minBets;
    cfg.strategyParameters.sizingMethod = sizeModel;
    cfg.strategyParameters.sizingMethodParameter = Number.parseFloat(betAmount);
    cfg.strategyParameters.portfolioAmount = Number.parseFloat(startingMoney);
    if (
      cfg.strategyParameters.betStyle === 0 &&
      cfg.strategyParameters.gametype === 3
    ) {
      alert("MLB can't use Spread bet style, please select a different one");
      return;
    }
    if (
      cfg.strategyParameters.betstyle !== 3 &&
      cfg.strategyParameters.gametype === 4
    ) {
      alert(
        'Soccer leagues use only moneyline bet style, please select a different one'
      );
      return;
    }
    if (
      cfg.strategyParameters.betstyle === 3 &&
      cfg.strategyParameters.gametype === 2
    ) {
      alert(
        "NCAAF can't use Moneyline bet style, please select a different one"
      );
      return;
    }
    if (
      cfg.strategyParameters.sizingMethod === 2 &&
      cfg.strategyParameters.gametype === 2
    ) {
      alert(
        'NCAAF can´t use Kelly bet sizing method, please select a different one'
      );
      return;
    }
    // const fileName = FILE_NAMES[league];
    cfg.selectedRules = checkedKeys.slice(0);
    cfg.requiredRules = [];
    if (cfg.requiredRules.length > numberRuleMin) {
      alert('Min rules should be at least equal to required rules.');
      return;
    }

    history.push({
      pathname: '/run-simulation',
      state: cfg
    });
  };

  showPortfolio = () => {
    const { history } = this.props;
    history.push({
      pathname: '/portfolio'
    });
  };

  render() {
    const {
      league,
      alertEmail,
      expandedKeys,
      autoExpandParent,
      checkedKeys,
      isOpenCalculatorModal
    } = this.state;
    const { history } = this.props;
    const formData = this.generateArray();

    return (
      <Container className="pageContainer">
        <MainHeader
          menus={[true, true, true, true]}
          onRun={this.onRunSimulation}
          onAlert={this.openAlertModal}
          history={history}
          league={league}
        />
        <Row>
          <Col md={12}>
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
          <Col md={6}>
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
                {alertEmail === '' && (
                  <Alert variant="info" className="infoAlert">
                    Please set your Alerts Email
                  </Alert>
                )}
                <ButtonToolbar className="parameterButtonsContainer">
                  <Button variant="link" onClick={this.showPortfolio}>
                    Show Portfolio
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => this.onCalcModalChange(true)}
                  >
                    Calculators
                  </Button>
                </ButtonToolbar>
              </Form>
            </div>
          </Col>
          <Col md={6}>
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
                  showIcon={false}
                  selectable={false}
                >
                  {loopTreeData(TREE_DATA[league])}
                </Tree>
                <ButtonToolbar className="parameterButtonsContainer">
                  <Button
                    variant="link"
                    onClick={() => this.generateSignal(200)}
                  >
                    Random 200
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => this.generateSignal(500)}
                  >
                    Random 500
                  </Button>
                  <Button variant="link" onClick={() => this.generateSignal(0)}>
                    Clear
                  </Button>
                </ButtonToolbar>
              </div>
            </div>
          </Col>
        </Row>
        {this.showEmailModal()}
        <CalculatorModal
          calc={isOpenCalculatorModal}
          onChangeStatus={this.onCalcModalChange}
        />
      </Container>
    );
  }
}

export default HomePage;
