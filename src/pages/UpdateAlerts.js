import React from 'react';
import { Container, Col, Row, Form } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import InputNumber from 'rc-input-number';
import MainHeader from '../components/Header';
import 'rc-input-number/assets/index.css';

const data = [
  {
    id: 1,
    date: '2018/03/05',
    league: 'league 1',
    team: 'a',
    opponent: 'b',
    betting_style: 'Betting 1',
    moneyline: 'c',
    spread: 'd',
    spread_vig: 'e',
    over_under: 'f',
    ou_vig: 'g',
    strategy_name: 'S Name 1',
    strategy_rules: 'S Rules 1',
    bet_amount: 'Bet Amount 1',
    bet_sizing: 'Bet Sizing 1',
    bet_size_calculator: 'Bt Size Calculator 1'
  },
  {
    id: 2,
    date: '2018/03/06',
    league: 'league 2',
    team: 'aa',
    opponent: 'bb',
    betting_style: 'Betting 2',
    moneyline: 'cc',
    spread: 'dd',
    spread_vig: 'ee',
    over_under: 'ff',
    ou_vig: 'gg',
    strategy_name: 'S Name 2',
    strategy_rules: 'S Rules 2',
    bet_amount: 'Bet Amount 2',
    bet_sizing: 'Bet Sizing 2',
    bet_size_calculator: 'Bt Size Calculator 2'
  }
];

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

class UpdateAlerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 100000,
      betSizing: 0,
      betInput: 1
    };
  }

  onDoubleClick = (e, row, rowIndex) => {
    console.log(e, row, rowIndex);
  };

  onChange = (id, value) => {
    this.setState({ [id]: value });
  };

  render() {
    const { history } = this.props;
    const { size, betSizing, betInput } = this.state;
    const rowEvents = {
      onDoubleClick: this.onDoubleClick
    };
    return (
      <Container className="pageContainer">
        <MainHeader menus={[true, true]} history={history} />
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
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} className="dataContainer">
            <BootstrapTable
              keyField="id"
              data={data}
              columns={columns}
              rowEvents={rowEvents}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UpdateAlerts;
