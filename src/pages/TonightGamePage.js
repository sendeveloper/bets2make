import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import MainHeader from '../components/Header';

const data = [
  {
    id: 1,
    date: '2018/03/05',
    team: 'a',
    opponent: 'b',
    moneyline: 'c',
    spread: 'd',
    spread_vig: 'e',
    over_under: 'f',
    ou_vig: 'g',
    rules: 'h'
  },
  {
    id: 2,
    date: '2019/03/05',
    team: 'aa',
    opponent: 'bb',
    moneyline: 'cc',
    spread: 'dd',
    spread_vig: 'ee',
    over_under: 'ff',
    ou_vig: 'gg',
    rules: 'hh'
  }
];

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
    this.state = {};
  }

  onDoubleClick = (e, row, rowIndex) => {
    console.log(e, row, rowIndex);
  };

  render() {
    const { history } = this.props;
    const rowEvents = {
      onDoubleClick: this.onDoubleClick
    };
    return (
      <Container className="pageContainer">
        <MainHeader menus={[]} history={history} />
        <Row>
          <Col md={12} className="dataContainer">
            <i>Double click to select a game</i>
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
      </Container>
    );
  }
}

export default TonightGamePage;
