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
    const { winPercent, profitPercent } = this.props;
    const winConfig = Object.assign({}, config1);
    const profitConfig = Object.assign({}, config2);
    let winLabel;
    let profitLabel;
    if (winPercent === 100) {
      winLabel = winPercent;
      winConfig.series[0].data[0].y = winLabel;
      winConfig.series[0].data[1].y = 100 - winPercent;
    } else {
      winLabel = Math.round(winPercent * 100) / 100;
      winConfig.series[0].data[0].y = winLabel;
      winConfig.series[0].data[1].y = 100 - winLabel;
    }
    if (profitPercent === 100) {
      profitLabel = profitPercent;
      profitConfig.series[0].data[0].y = profitLabel;
      profitConfig.series[0].data[1].y = 100 - profitPercent;
    } else {
      profitLabel = Math.round(profitPercent * 100) / 100;
      profitConfig.series[0].data[0].y = profitLabel;
      profitConfig.series[0].data[1].y = 100 - profitLabel;
    }

    return (
      <Row>
        <Col lg={6} className="pieContainer">
          <ReactHighcharts config={winConfig} />
          <span>{winLabel}%</span>
        </Col>
        <Col lg={6} className="pieContainer">
          <ReactHighcharts config={profitConfig} />
          <span>{profitLabel}%</span>
        </Col>
      </Row>
    );
  }
}

export default Winning;
