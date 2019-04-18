import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ReactHighcharts from 'react-highcharts';
import { calcMaxMin } from '../utils/functions';

const BASIC_CONFIG = {
  chart: {
    height: 450,
    type: 'spline'
  },
  title: {
    text: 'Monte Carlo'
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
class MonteCarlo extends React.Component {
  render() {
    const { monteLabel, monteChart, monteExtend } = this.props;
    const config = Object.assign({}, BASIC_CONFIG);
    let min = 2147483647;
    let max = -2147483648;
    // eslint-disable-next-line
    monteChart.map(eachChart => {
      const { max: maxEach, min: minEach } = calcMaxMin(eachChart);
      const serie = {
        showInLegend: false,
        data: eachChart
      };
      config.series.push(serie);
      config.colors.push('#999999');
      if (min > minEach) {
        min = minEach;
      }
      if (max < maxEach) {
        max = maxEach;
      }
    });
    // eslint-disable-next-line
    monteExtend.map(eachData => {
      const { max: maxEach, min: minEach } = calcMaxMin(eachData.data);
      const serie = {
        showInLegend: false,
        data: eachData.data
      };
      config.series.push(serie);
      config.colors.push(eachData.color);
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
        <Col md={12}>
          <ReactHighcharts config={config} />
        </Col>
      </Row>
    );
  }
}

export default MonteCarlo;
