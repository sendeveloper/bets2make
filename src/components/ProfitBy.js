import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ReactHighcharts from 'react-highcharts';
import { calcMaxMin } from '../utils/functions';

const BASIC_CONFIG1 = {
  chart: {
    height: 200,
    type: 'column'
  },
  title: {
    text: 'Profit / Loss by Month'
  },
  xAxis: {
    categories: []
  },
  yAxis: {
    title: {
      text: null
    },
    tickAmount: 4
  },
  series: [
    {
      showInLegend: false,
      data: [-500, 1000, 2500, 7500, 2500, 3500],
      zones: [
        {
          value: 0,
          color: '#FF0000'
        },
        {
          color: '#00FF00'
        }
      ]
    }
  ]
};
const BASIC_CONFIG2 = {
  chart: {
    height: 200,
    type: 'column'
  },
  title: {
    text: 'Profit / Loss by Year'
  },
  xAxis: {
    categories: []
  },
  yAxis: {
    title: {
      text: null
    },
    tickAmount: 5
  },
  series: [
    {
      showInLegend: false,
      data: [],
      zones: [
        {
          value: 0,
          color: '#FF0000'
        },
        {
          color: '#00FF00'
        }
      ]
    }
  ]
};
class ProfitBy extends React.Component {
  render() {
    const {
      newYearLine1,
      newYearLine2,
      yearKeys,
      newMonthLine1,
      newMonthLine2,
      monthKeys
    } = this.props;
    const config1 = Object.assign({}, BASIC_CONFIG1);
    const { max: maxM1, min: minM1 } = calcMaxMin(newMonthLine1);
    const { max: maxM2, min: minM2 } = calcMaxMin(newMonthLine2);
    config1.series[0].data = newMonthLine1;
    config1.series[1] = {
      showInLegend: false,
      data: newMonthLine2,
      zones: [
        {
          value: 0,
          color: '#FF0000'
        },
        {
          color: '#00FF00'
        }
      ]
    };
    config1.yAxis.max = Math.max(maxM1, maxM2);
    config1.yAxis.min = Math.min(minM1, minM2);
    config1.xAxis.categories = monthKeys;

    const config2 = Object.assign({}, BASIC_CONFIG2);
    const { max: maxY1, min: minY1 } = calcMaxMin(newYearLine1);
    const { max: maxY2, min: minY2 } = calcMaxMin(newYearLine2);
    config2.series[0].data = newYearLine1;
    config2.series[1] = {
      showInLegend: false,
      data: newYearLine2,
      zones: [
        {
          value: 0,
          color: '#FF0000'
        },
        {
          color: '#00FF00'
        }
      ]
    };
    config2.yAxis.max = Math.max(maxY1, maxY2);
    config2.yAxis.min = Math.min(minY1, minY2);
    config2.xAxis.categories = yearKeys;

    return (
      <Row>
        <Col md={6}>
          <ReactHighcharts config={config1} />
        </Col>
        <Col md={6}>
          <ReactHighcharts config={config2} />
        </Col>
      </Row>
    );
  }
}

export default ProfitBy;
