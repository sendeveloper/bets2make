import React from 'react';
import { Col, Row } from 'react-bootstrap';
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
  render() {
    const { newLine, maxSeries } = this.props;
    // let config = this.generateConfig();
    const config = Object.assign({}, BASIC_CONFIG);
    const { max, min } = calcMaxMin(newLine);
    config.series[0].data = newLine;
    config.series[1] = { data: maxSeries, showInLegend: false };
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

export default ProfitLoss;
