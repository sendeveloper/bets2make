import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import MainHeader from '../components/Header';
import ProfitLoss from '../components/ProfitLoss';
import Drawdown from '../components/Drawdown';
import ProfitBy from '../components/ProfitBy';
import MonteCarlo from '../components/MonteCarlo';
import Winning from '../components/Winning';
import SimulateData from '../components/SimulateData';

class RunSimulation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onDoubleClick = (e, row, rowIndex) => {
    console.log(e, row, rowIndex);
  };

  onChange = (id, value) => {
    this.setState({ [id]: value });
  };

  onLoadPortfolio = () => {
    alert('onLoadPortfolio');
  };

  render() {
    const { history } = this.props;
    return (
      <Container className="pageContainer">
        <MainHeader menus={[true, true, true]} history={history} />
        <Row>
          <Col lg={6}>
            <ProfitLoss />
            <Drawdown />
            <ProfitBy />
          </Col>
          <Col lg={6}>
            <MonteCarlo />
            <Winning />
          </Col>
        </Row>
        <SimulateData onLoadPortfolio={this.onLoadPortfolio} />
      </Container>
    );
  }
}

export default RunSimulation;
