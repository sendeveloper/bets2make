import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { LEAGUE, BETTING_STYLE, SIZING_MODEL } from '../utils/constants';

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
  }
];

class SimulateData extends React.Component {
  getData = () => {
    const { data } = this.props;
    const tableData = [];
    // eslint-disable-next-line
    data.map((each, index) => {
      const row = {};
      row.id = index;
      row.league = LEAGUE.data[each.StrategyParameters.gametype].value;
      row.betting_style =
        BETTING_STYLE.data[each.StrategyParameters.betstyle].value;
      row.bet_sizing =
        SIZING_MODEL.data[each.StrategyParameters.sizingMethod].value +
        `0${each.StrategyParameters.sizingMethodParameter}`.slice(-2);
      row.strategy_name = `${each.strategyName} `;
      row.signal_names = each.strategyRulesNames;
      row.total_p_l = each.sum;
      row.dd = each.dd;
      row.bets = each.win + each.loss;
      if (each.betsListCnt !== 0) {
        row.win_percent = ((each.win * 100) / row.bets).toFixed(2);
        row.normalized_win = (
          (each.amountWins * 100) /
          (each.amountWins + Math.abs(each.amountLoss))
        ).toFixed(2);
      } else {
        row.win_percent = '0.00';
        row.normalized_win = '0.00';
      }

      row.straight_up = (
        (each.straight_up_win * 100) /
        (each.win + each.loss)
      ).toFixed(2);

      row.pf = 100;
      if (each.amountLoss !== 0) {
        row.pf = (each.amountWins / Math.abs(each.amountLoss)).toFixed(2);
      }

      row.shape = each.sharpe.toFixed(2);

      tableData.push(row);
    });
    return tableData;
  };

  render() {
    const {
      portfolio,
      onTableClickRow,
      onAddToPortfolio,
      onLoadPortfolio,
      onRemove,
      onBackResult,
      showBackButton,
      selected
    } = this.props;
    const tableData = this.getData();
    const selectRow = {
      mode: 'radio',
      style: { background: '#DDD' },
      clickToSelect: true,
      onSelect: onTableClickRow,
      selected: [selected]
    };
    return (
      <Row>
        <Col md={12} className="simulateContainer">
          {portfolio ? (
            showBackButton && (
              <Button variant="link" onClick={onBackResult}>
                Back to Results
              </Button>
            )
          ) : (
            <Button variant="link" onClick={onLoadPortfolio}>
              Load Portfolio
            </Button>
          )}
        </Col>
        <Col md={12} className="dataContainer">
          <BootstrapTable
            keyField="id"
            data={tableData}
            columns={columns}
            selectRow={selectRow}
          />
          {portfolio ? (
            <Button variant="primary" onClick={onRemove}>
              Remove from Portfolio
            </Button>
          ) : (
            <Button variant="primary" onClick={onAddToPortfolio}>
              Add to Portfolio
            </Button>
          )}
        </Col>
      </Row>
    );
  }
}

export default SimulateData;
