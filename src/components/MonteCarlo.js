import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ReactHighcharts from 'react-highcharts';

class MonteCarlo extends React.Component {
  constructor(props) {
    super(props);
    const config = {
      chart: {
        height: 450,
        type: 'spline'
      },
      title: {
        text: 'Monte Carlo'
      },
      colors: [],
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
        tickAmount: 8,
        max: 30000,
        min: -5000
      },
      series: []
    };

    const count = 20;
    // eslint-disable-next-line
    for (let i = 0; i < count; i = i + 1) {
      const serie = {
        showInLegend: false,
        data: this.generateData()
      };
      config.series.push(serie);
      if (i < count - 3) {
        config.colors.push('#999999');
      }
    }
    config.colors.push('#FF0000');
    config.colors.push('#00FF00');
    config.colors.push('#0000FF');
    this.state = {
      config: Object.assign({}, config)
    };
  }

  generateData = () => {
    const data = [];
    // eslint-disable-next-line
    for (let i = 0; i < 21; i = i + 1) {
      const p = (i + 1) * 800;
      const ran = 3000 + (i + 1) * 400;
      data.push(Math.ceil(Math.random() * ran + p - 2000));
    }
    return data;
  };

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

export default MonteCarlo;
