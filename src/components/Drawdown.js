import React from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import ReactHighcharts from 'react-highcharts';
import { calcMaxMin } from '../utils/functions';

const BASIC_CONFIG = {
  chart: {
    height: 150,
    type: 'spline'
  },
  title: {
    text: 'Drawdown'
  },
  colors: ['#FF0000'],
  xAxis: {
    categories: [],
    tickInterval: 10
  },
  yAxis: {
    title: {
      text: null
    },
    tickAmount: 2,
    max: -1000,
    min: -6000
  },
  series: [
    {
      showInLegend: false,
      data: []
    }
  ]
};
class Drawdown extends React.Component {
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
    const { newLineDD } = this.props;
    const configZoom = JSON.parse(JSON.stringify(BASIC_CONFIG));
    const { max, min } = calcMaxMin(newLineDD);
    configZoom.series[0].data = newLineDD;
    configZoom.yAxis.max = max;
    configZoom.yAxis.min = min;
    configZoom.chart.height = 300;
    configZoom.xAxis.tickInterval = 5;
    configZoom.yAxis.tickAmount = 5;

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
    const { newLineDD } = this.props;
    const config = JSON.parse(JSON.stringify(BASIC_CONFIG));
    const { max, min } = calcMaxMin(newLineDD);
    config.series[0].data = newLineDD;
    config.yAxis.max = max;
    config.yAxis.min = min;
    return (
      <Row>
        <Col md={12} style={{ position: 'relative' }}>
          <ReactHighcharts config={config} />
          <Button
            variant="variant"
            onClick={this.onZoom}
            className="zoomButton"
          >
            <img src="../images/zoom.png" alt="zoom" />
          </Button>
        </Col>
        {this.onShowZoom()}
      </Row>
    );
  }
}

export default Drawdown;
