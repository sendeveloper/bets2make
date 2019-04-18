import React from 'react';
import { Col, Row } from 'react-bootstrap';
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
  render() {
    const { newLineDD } = this.props;
    // let config = this.generateConfig();
    const config = Object.assign({}, BASIC_CONFIG);
    const { max, min } = calcMaxMin(newLineDD);
    config.series[0].data = newLineDD;
    config.yAxis.max = max;
    config.yAxis.min = min;
    return (
      <Row>
        <Col md={12}>
          <ReactHighcharts config={config} />
        </Col>
      </Row>
    );
  }
}

export default Drawdown;
