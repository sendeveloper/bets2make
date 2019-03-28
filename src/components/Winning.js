import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ReactHighcharts from 'react-highcharts';

class Winning extends React.Component {
  constructor(props) {
    super(props);
    const config1 = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        height: 200
      },
      title: {
        text: '% of Winning Bets'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
            distance: -50
          },
          showInLegend: false,
          startAngle: -90
        }
      },
      series: [
        {
          name: 'Bets',
          colorByPoint: true,
          type: 'pie',
          innerSize: '50%',
          data: [
            {
              name: 'Win',
              y: 53.36,
              color: '#00FF00'
            },
            {
              name: 'Lose',
              y: 100 - 53.36,
              color: '#FF0000'
            }
          ]
        }
      ]
    };
    const config2 = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        height: 200
      },
      title: {
        text: 'Normalized Win %'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
            distance: -50
          },
          showInLegend: false,
          startAngle: -90
        }
      },
      series: [
        {
          name: 'Bets',
          colorByPoint: true,
          type: 'pie',
          innerSize: '50%',
          data: [
            {
              name: 'Win',
              y: 53.36,
              color: '#00FF00'
            },
            {
              name: 'Lose',
              y: 100 - 53.36,
              color: '#FF0000'
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
        <Col lg={6} className="pieContainer">
          <ReactHighcharts config={config1} />
          <span>53.36%</span>
        </Col>
        <Col lg={6} className="pieContainer">
          <ReactHighcharts config={config2} />
          <span>53.36%</span>
        </Col>
      </Row>
    );
  }
}

export default Winning;
