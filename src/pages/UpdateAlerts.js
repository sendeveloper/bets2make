import React from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import InputNumber from 'rc-input-number';
import MainHeader from '../components/Header';
import 'rc-input-number/assets/index.css';
import {
  getMatchingBets,
  getBestStyle,
  calcBetSize,
  addBet
} from '../utils/functions';
import {
  LEAGUE,
  GAME_TYPE,
  TREE_DATA,
  BETTING_STYLE,
  SIZING_MODEL
} from '../utils/constants';

const columns = [
  {
    dataField: 'date',
    text: 'Date',
    sort: true
  },
  {
    dataField: 'league',
    text: 'League',
    sort: true
  },
  {
    dataField: 'team',
    text: 'Team',
    sort: true
  },
  {
    dataField: 'opponent',
    text: 'Opponent',
    sort: true
  },
  {
    dataField: 'betting_style',
    text: 'Betting Style',
    sort: true
  },
  {
    dataField: 'moneyline',
    text: 'MoneyLine',
    sort: true
  },
  {
    dataField: 'spread',
    text: 'Spread',
    sort: true
  },
  {
    dataField: 'spread_vig',
    text: 'Spread Vig',
    sort: true
  },
  {
    dataField: 'over_under',
    text: 'Over/Under',
    sort: true
  },
  {
    dataField: 'ou_vig',
    text: 'OU Vig',
    sort: true
  },
  {
    dataField: 'strategy_name',
    text: 'Strategy Name',
    sort: true
  },
  {
    dataField: 'strategy_rules',
    text: 'Strategy Rules'
  },
  {
    dataField: 'bet_amount',
    text: 'Bet Amount'
  },
  {
    dataField: 'bet_sizing',
    text: 'Bet Sizing'
  },
  {
    dataField: 'bet_size_calculator',
    text: 'Bet Size Calculator'
  }
];

// From Restful API
const GAME_CACHE_INSTANCE = {
  historyRawData: [],
  tonightRawData: [],
  updatesRawData: []
};

class UpdateAlerts extends React.Component {
  constructor(props) {
    super(props);

    const portfolioString = localStorage.getItem('portfolioData');
    let portfolioData = [];
    try {
      portfolioData = portfolioString ? JSON.parse(portfolioString) : [];
    } catch (e) {
      console.log('parse error', e);
    }
    this.state = {
      portfolioData,
      size: 100000,
      betSizing: 0,
      betInput: 1,
      checked: false
    };
  }

  onChange = (id, value) => {
    this.setState({ [id]: value });
  };

  copyData = () => {};

  onChangeCheck = e => {
    this.setState({ checked: e.currentTarget.value });
  };

  generateBetAlerts = (strategy, cfg) => {
    const betAlerts = [];
    const gamesCache = GAME_CACHE_INSTANCE;
    let evCalculator = {
      totalGames: 0,
      wonGamesML: 0,
      pushML: 0,
      spreadWon: [],
      spreadTotalGames: [],
      spreadPush: []
    };
    const matchingBets = getMatchingBets(
      strategy.strategyRulesNames,
      cfg,
      gamesCache.tonightRawData[strategy.StrategyParameters.gametype]
    );
    const matchingBetsUpdates = getMatchingBets(
      strategy.strategyRulesNames,
      cfg,
      gamesCache.updatesRawData[strategy.StrategyParameters.gametype]
    );
    // eslint-disable-next-line
    matchingBets.map(each => {
      evCalculator = addBet(evCalculator, each);
    });
    // eslint-disable-next-line
    matchingBetsUpdates.map(each => {
      evCalculator = addBet(evCalculator, each);
    });
    const tonightMatchingBets = getMatchingBets(
      strategy.strategyRulesNames,
      cfg,
      gamesCache.tonightRawData[strategy.StrategyParameters.gametype]
    );
    // eslint-disable-next-line
    tonightMatchingBets.map(match => {
      if (match.DATE >= new Date('YYYYMMDD')) {
        betAlerts.push({
          strategy,
          bet: match,
          recommendedBetStyle: getBestStyle(evCalculator, match)
        });
      }
    });
    return betAlerts;
  };

  generateData = () => {
    const { history } = this.props;
    const { state } = history.location;
    const cfg = JSON.parse(JSON.stringify(state));
    const { portfolioData } = this.state;
    let betAlerts = [];
    const str = TREE_DATA[cfg.strategyParameters.gametype].split('|');
    let array = [];
    // eslint-disable-next-line
    str.map(item => {
      const itemArray = item.split(';');
      array = [...array, ...itemArray.slice(1)];
    });
    cfg.rulesTitles = array;
    // eslint-disable-next-line
    portfolioData.map(each => {
      if (each.isActive) {
        betAlerts = [...betAlerts, ...this.generateBetAlerts(each, cfg)];
      }
    });
    return betAlerts;
  };

  refreshItems = () => {
    const { checked, size, betSizing, betInput } = this.state;
    const listBets = [];
    const alerts = this.generateData();
    // eslint-disable-next-line
    alerts.map((alert, index) => {
      const item = {};
      if (alert.bet.DATE <= new Date('YYYYMMDD') || checked) {
        item.id = index;
        item.date = alert.bet.DATE;
        if (alert.strategy.strategyParameters.gametype !== GAME_TYPE.SPA) {
          item.league =
            LEAGUE.data[alert.strategy.strategyParameters.gametype].value;
        } else {
          item.league = alert.bet.LEAGUE;
        }
        item.team = alert.bet.TEAM;
        item.opponent = alert.bet.OPPONENT;
        item.betting_style = BETTING_STYLE.data[
          alert.strategy.strategyParameters.betStyle
        ].value.toUpperCase();
        item.moneyline = alert.bet.ML.toString();
        item.spread = alert.bet.SPREAD.toString();
        item.spread_vig = alert.bet.SPREAD_VIG.toString();
        item.over_under = alert.bet.OU.toString();
        item.ou_vig = alert.bet.OU_OVER.toString();
        item.strategy_name = alert.strategy.strategyName;
        item.strategy_rules = alert.strategy.selectedRules;

        const parameters = Object.assign({}, alert.strategy.strategyParameters);

        if (betSizing !== 0) {
          parameters.sizingMethod = betSizing - 1;
          parameters.sizingMethodParameter = betInput;
        }
        const { ret, calculator } = calcBetSize(
          parameters,
          alert.bet,
          size,
          alert.strategy.strategyParameters.betStyle
        );
        item.bet_amount = `$ ${ret.toString()}`;
        item.bet_sizing =
          SIZING_MODEL.data[parameters].value + parameters.toString();
        item.bet_size_calculator = calculator;

        listBets.push(item);
      }
    });

    return listBets;
  };

  render() {
    const { history } = this.props;
    const { size, betSizing, betInput, checked } = this.state;
    const data = this.refreshItems();
    const selectRow = {
      mode: 'radio',
      style: { background: '#DDD' },
      clickToSelect: true
    };
    return (
      <Container className="pageContainer">
        <MainHeader menus={[]} history={history} />
        <Row className="dataFilter">
          <Col md={3} lg={2}>
            <Form.Label className="formLabel">Portfolio Size:</Form.Label>
          </Col>
          <Col md={3} lg={2}>
            <InputNumber
              className="formNumberControl"
              max={100000000}
              min={1}
              step={1}
              value={size}
              displaytype="text"
              onChange={e => this.onChange('size', e)}
              style={{
                wrap: {
                  height: 38,
                  width: '100%'
                },
                input: {
                  height: 38,
                  padding: 4,
                  width: '100%'
                }
              }}
            />
          </Col>
          <Col md={3} lg={2}>
            <Form.Label className="formLabel">Bet Sizing:</Form.Label>
          </Col>
          <Col md={3} lg={2}>
            <Form.Control
              as="select"
              className="formControl"
              onChange={e => this.onChange('betSizing', e.currentTarget.value)}
              value={betSizing}
            >
              <option key={0} value={0}>
                Use Strategy
              </option>
              <option key={1} value={1}>
                Fixed $
              </option>
              <option key={2} value={2}>
                Fixed %
              </option>
              <option key={3} value={3}>
                Kelly
              </option>
            </Form.Control>
          </Col>
          <Col md={3} lg={2}>
            <Form.Label className="formLabel">Bet Size Input:</Form.Label>
          </Col>
          <Col md={3} lg={2}>
            <InputNumber
              className="formNumberControl"
              max={1000000}
              min={0}
              step={1}
              value={betInput}
              displaytype="text"
              onChange={e => this.onChange('betInput', e)}
              style={{
                wrap: {
                  height: 38,
                  width: '100%'
                },
                input: {
                  height: 38,
                  padding: 4,
                  width: '100%'
                }
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Check
              type="checkbox"
              label="View whole week"
              className="formCheck"
              value={checked}
              onChange={this.onChangeCheck}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} className="dataContainer">
            <BootstrapTable
              keyField="id"
              data={data}
              columns={columns}
              selectRow={selectRow}
            />
          </Col>
          <Col md={4}>
            <Button variant="link" onClick={this.copyData}>
              Copy Data
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UpdateAlerts;
