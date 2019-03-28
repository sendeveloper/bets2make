import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ReactHighcharts from 'react-highcharts';

class ProfitLoss extends React.Component {
  constructor(props) {
    super(props);
    const config = {
      chart: {
        height: 300,
        type: 'spline'
      },
      title: {
        text: 'Total Profit / Loss'
      },
      colors: ['#00FF00'],
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
        tickAmount: 6,
        max: 20000,
        min: -5000
      },
      series: [
        {
          showInLegend: false,
          data: [
            0,
            400,
            800,
            -200,
            500,
            1000,
            1500,
            2500,
            4000,
            5000,
            3000,
            2000,
            4000,
            6000,
            8000,
            3000,
            4000,
            5000,
            2000,
            8000,
            14000
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

export default ProfitLoss;
