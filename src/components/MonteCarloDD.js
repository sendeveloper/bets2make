import React from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import ReactHighcharts from 'react-highcharts';
import { calcMaxMin } from '../utils/functions';

const BASIC_CONFIG = {
  chart: {
    height: 450
  },
  title: {
    text: 'Monte Carlo DD'
  },
  colors: [],
  xAxis: {
    categories: [],
    tickInterval: 10
  },
  yAxis: {
    title: {
      text: null
    },
    tickAmount: 8,
    max: 30000,
    min: -5000
  },
  series: []
};

const SERIES = [
  {
    showInLegend: false,
    type: 'column'
  },
  {
    showInLegend: false,
    type: 'spline'
  }
];

const COLORS = ['#00FF00', '#0000FF'];
class MonteCarloDD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: false
    };
  }

  onZoom = () => {
    this.setState({ zoom: true });
  };

  closeAlertModal = () => {
    this.setState({ zoom: false });
  };

  onShowZoom = () => {
    const { zoom } = this.state;
    const { monteLabel, monteChart } = this.props;
    const config = JSON.parse(JSON.stringify(BASIC_CONFIG));
    let min = 2147483647;
    let max = -2147483648;
    // eslint-disable-next-line
    monteChart.map((eachChart, index) => {
      const { max: maxEach, min: minEach } = calcMaxMin(eachChart);
      const serie = Object.assign({}, SERIES[index]);
      serie.data = eachChart;
      config.series.push(serie);
      config.colors.push(COLORS[index]);
      if (min > minEach) {
        min = minEach;
      }
      if (max < maxEach) {
        max = maxEach;
      }
    });
    config.xAxis.categories = monteLabel;
    config.xAxis.tickInterval =
      monteLabel.length > 0 ? Math.floor(monteLabel.length / 2) : 1;
    config.yAxis.max = max;
    config.yAxis.min = min;
    config.chart.height = 500;
    config.xAxis.tickInterval = 5;
    config.yAxis.tickAmount = 10;
    if (!zoom) {
      return false;
    }
    return (
      <Modal show={zoom} size="lg" centered onHide={this.closeAlertModal}>
        <Modal.Header closeButton>
          <Modal.Title>Graph Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactHighcharts config={config} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.closeAlertModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  render() {
    const { monteLabel, monteChart } = this.props;
    const config = JSON.parse(JSON.stringify(BASIC_CONFIG));
    let min = 2147483647;
    let max = -2147483648;

    // eslint-disable-next-line
    monteChart.map((eachChart, index) => {
      const { max: maxEach, min: minEach } = calcMaxMin(eachChart);
      const serie = Object.assign({}, SERIES[index]);
      serie.data = eachChart;
      config.series.push(serie);
      config.colors.push(COLORS[index]);
      if (min > minEach) {
        min = minEach;
      }
      if (max < maxEach) {
        max = maxEach;
      }
    });
    config.xAxis.categories = monteLabel;
    config.xAxis.tickInterval =
      monteLabel.length > 0 ? Math.floor(monteLabel.length / 2) : 1;
    config.yAxis.max = max;
    config.yAxis.min = min;

    return (
      <Row>
        <Col md={12} style={{ position: 'relative' }}>
          <ReactHighcharts config={config} />
          <Button variant="light" onClick={this.onZoom} className="zoomButton">
            <img src="../images/zoom.png" alt="zoom" />
          </Button>
        </Col>
        {this.onShowZoom()}
      </Row>
    );
  }
}

export default MonteCarloDD;
