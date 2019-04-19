import React from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import ReactHighcharts from 'react-highcharts';
import { calcMaxMin } from '../utils/functions';

const BASIC_CONFIG = {
  chart: {
    height: 300,
    type: 'spline'
  },
  title: {
    text: 'Total Profit / Loss'
  },
  colors: ['#00FF00'],
  xAxis: {
    categories: [],
    tickInterval: 10
  },
  yAxis: {
    title: {
      text: null
    },
    tickAmount: 6,
    max: 0,
    min: 0
  },
  series: [
    {
      showInLegend: false,
      data: []
    }
  ]
};
class ProfitLoss extends React.Component {
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
    const { newLine, maxSeries } = this.props;
    const configZoom = JSON.parse(JSON.stringify(BASIC_CONFIG));
    const { max, min } = calcMaxMin(newLine);
    configZoom.series[0].data = newLine;
    configZoom.series[1] = { data: maxSeries, showInLegend: false };
    configZoom.yAxis.max = max;
    configZoom.yAxis.min = min;
    configZoom.chart.height = 500;
    configZoom.xAxis.tickInterval = 5;
    configZoom.yAxis.tickAmount = 10;

    if (!zoom) {
      return false;
    }
    return (
      <Modal show={zoom} size="lg" centered onHide={this.closeAlertModal}>
        <Modal.Header closeButton>
          <Modal.Title>Graph Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactHighcharts config={configZoom} />
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
    const { newLine, maxSeries } = this.props;
    const config = JSON.parse(JSON.stringify(BASIC_CONFIG));
    const { max, min } = calcMaxMin(newLine);
    config.series[0].data = newLine;
    config.series[1] = { data: maxSeries, showInLegend: false };
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

export default ProfitLoss;
