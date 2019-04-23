import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import MainHeader from '../components/Header';

const columns = [
  {
    dataField: 'date',
    text: 'Date',
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
    dataField: 'rules',
    text: 'Rules',
    sort: true
  }
];

class TonightGamePage extends React.Component {
  constructor(props) {
    super(props);
    const tableData = props.location.state;
    const data = [];
    // eslint-disable-next-line
    tableData.map((match, index) => {
      // if (match.DATE = new Date("YMD")) {
      const date = match.DATE.toString();
      const each = {};
      each.id = index;
      each.date = `${date.substring(0, 4)}/${date.substring(
        4,
        6
      )}/${date.substring(6, 8)}`;
      each.team = match.TEAM;
      each.opponent = match.OPPONENT;
      each.moneyline = match.ML;
      each.spread = match.SPREAD;
      each.spread_vig = match.SPREAD_VIG;
      each.over_under = match.OU;
      each.ou_vig = match.OU_OVER;
      each.rules = '';
      data.push(each);
      // }

      // String matchRules = "";
      // List<String> matchRulesList = new List<string>();
      // for (int ruleIndex = 0; ruleIndex < cfg.rulesTitles.Count; ruleIndex++)
      // {
      //     if (match.signal[ruleIndex] == 1)
      //     {
      //         matchRulesList.Add(cfg.rulesTitles[ruleIndex]);
      //         matchRules += ", " + cfg.rulesTitles[ruleIndex];
      //     }
      // }

      // matchRules += "  ";
      // matchRules = matchRules.Substring(1).Trim();

      // item.Tag = matchRulesList;
      // item.SubItems.Add(matchRules);
      // lstBets.Items.Add(item);
    });
    this.state = {
      // league: props.match.params.league,
      data,
      selected: -1
    };
  }

  onTableClickRow = row => {
    this.setState({ selected: row.id });
  };

  render() {
    const { history } = this.props;
    const { data, selected } = this.state;
    const selectRow = {
      mode: 'radio',
      style: { background: '#DDD' },
      clickToSelect: true,
      onSelect: this.onTableClickRow,
      selected: [selected]
    };
    return (
      <Container className="pageContainer">
        <MainHeader menus={[]} history={history} />
        <Row>
          <Col md={12} className="dataContainer">
            <i>Click to select a game</i>
          </Col>
          <Col md={12} className="tonightContainer">
            <BootstrapTable
              keyField="id"
              data={data}
              columns={columns}
              selectRow={selectRow}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TonightGamePage;
