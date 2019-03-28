import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ReactHighcharts from 'react-highcharts';

class Drawdown extends React.Component {
  constructor(props) {
    super(props);
    const config = {
      chart: {
        height: 150,
        type: 'spline'
      },
      title: {
        text: 'Drawdown'
      },
      colors: ['#FF0000'],
      xAxis: {
        categories: [
          100,
          200,
          300,
          400,
          500,
          600,
          700,
          800,
          900,
          1000,
          1200,
          1300,
          1300,
          1400,
          1500,
          1600,
          1700,
          1800,
          1900,
          2000,
          2400
        ],
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
          data: [
            -900,
            -1000,
            -900,
            -1200,
            -1500,
            -1400,
            -1700,
            -800,
            -900,
            -2000,
            -1500,
            -2000,
            -1200,
            -1000,
            -800,
            -5000,
            -3000,
            -700,
            -700,
            -700
          ]
        }
      ]
    };
    this.state = {
      config: Object.assign({}, config)
    };
  }

  render() {
    const { config } = this.state;
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
