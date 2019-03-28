import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ReactHighcharts from 'react-highcharts';

class ProfitBy extends React.Component {
  constructor(props) {
    super(props);
    const config1 = {
      chart: {
        height: 200,
        type: 'column'
      },
      title: {
        text: 'Profit / Loss by Month'
      },
      xAxis: {
        categories: [1, 2, 9, 10, 11, 12]
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
    const config2 = {
      chart: {
        height: 200,
        type: 'column'
      },
      title: {
        text: 'Profit / Loss by Year'
      },
      xAxis: {
        categories: [
          '06',
          '07',
          '08',
          '09',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18'
        ]
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
          data: [
            3000,
            -1000,
            1500,
            1000,
            500,
            0,
            2000,
            -2000,
            1500,
            1500,
            1000,
            -4000,
            14000
          ],
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
    this.state = {
      config1: Object.assign({}, config1),
      config2: Object.assign({}, config2)
    };
  }

  render() {
    const { config1, config2 } = this.state;
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
