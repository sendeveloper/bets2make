import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';

const data = [
  {
    id: 1,
    league: 'NFL',
    betting_style: 'Spread',
    bet_sizing: 'Fixed $100',
    strategy_name: '',
    signal_names: 'Spread +8 or Less, Opp Ya...',
    total_p_l: '16,400',
    dd: '-5,000',
    bets: '2,444',
    win_percent: '53.36',
    normalized_win: '53.36',
    straight_up: '36.67',
    pf: '1.1439',
    shape: '1.07'
  },
  {
    id: 2,
    league: 'NFL',
    betting_style: 'Spread',
    bet_sizing: 'Fixed $200',
    strategy_name: '',
    signal_names: 'Spread +8 or Less, Opp Ya...',
    total_p_l: '12,400',
    dd: '-2,000',
    bets: '1,444',
    win_percent: '54.36',
    normalized_win: '57.36',
    straight_up: '38.67',
    pf: '1.2439',
    shape: '3.07'
  }
];

const columns = [
  {
    dataField: 'league',
    text: 'League',
    sort: true
  },
  {
    dataField: 'betting_style',
    text: 'Betting Style',
    sort: true
  },
  {
    dataField: 'bet_sizing',
    text: 'Bet Sizing',
    sort: true
  },
  {
    dataField: 'strategy_name',
    text: 'Strategy Name',
    sort: true
  },
  {
    dataField: 'signal_names',
    text: 'Signal Names',
    sort: true
  },
  {
    dataField: 'total_p_l',
    text: 'Total P & L',
    sort: true
  },
  {
    dataField: 'dd',
    text: 'DD',
    sort: true
  },
  {
    dataField: 'bets',
    text: 'Bets',
    sort: true
  },
  {
    dataField: 'win_percent',
    text: 'Win %',
    sort: true
  },
  {
    dataField: 'normalized_win',
    text: 'Normalized',
    sort: true
  },
  {
    dataField: 'straight_up',
    text: 'Straight Up Win %',
    sort: true
  },
  {
    dataField: 'pf',
    text: 'PF',
    sort: true
  },
  {
    dataField: 'shape',
    text: 'Shape',
    sort: true
  },
  {
    dataField: 'portfolio',
    text: 'Portfolio',
    sort: true
  }
];

// const selectRow = {
//   mode: 'checkbox',
//   style: { background: '#CCC' },
//   hideSelectAll: true,
//   title: 'Active'
// };

class SimulateData extends React.Component {
  onDoubleClick = (e, row, rowIndex) => {
    console.log(e, row, rowIndex);
  };

  render() {
    const rowEvents = {
      onDoubleClick: this.onDoubleClick
    };
    const { onLoadPortfolio } = this.props;
    return (
      <Row>
        <Col md={12} className="simulateContainer">
          <Button variant="link" onClick={onLoadPortfolio}>
            Load Portfolio
          </Button>
        </Col>
        <Col md={12} className="dataContainer">
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            rowEvents={rowEvents}
          />
        </Col>
      </Row>
    );
  }
}

export default SimulateData;
