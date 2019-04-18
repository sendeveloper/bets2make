import React from 'react';
import { getSimulationData, getSimulationGraphData } from '../utils/api';
import GraphPage from './GraphPage';

class RunSimulation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tableData: [],
      graphData: [],
      selectedId: -1
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const { state } = history.location;
    if (state) {
      getSimulationData(state, result => {
        let tableData;
        if (result) {
          tableData = result.gdata;
          if (tableData.length > 0) {
            this.loadGraphData(tableData[0].strategyId);
            this.setState({ selectedId: 0 });
          } else {
            alert(result.msg);
            history.push({ pathname: '/' });
          }
        } else {
          tableData = [];
        }
        this.setState({ tableData });
      });
    } else {
      alert("Sorry, you don't have enough permission to visit this page");
      history.push({ pathname: '/' });
    }
  }

  loadGraphData = id => {
    this.setState({ loading: false });
    getSimulationGraphData(id, result => {
      let graphData;
      if (result) {
        graphData = result.gdata;
      } else {
        graphData = [];
      }
      this.setState({ graphData, loading: false });
    });
  };

  onSelectId = id => {
    this.setState({ selectedId: id });
  };

  render() {
    const { history } = this.props;
    const { tableData, graphData, selectedId, loading } = this.state;
    return (
      <GraphPage
        tableData={tableData}
        graphData={graphData}
        selectedId={selectedId}
        portfolio={false}
        loadGraphData={this.loadGraphData}
        onSelectId={this.onSelectId}
        loading={loading}
        history={history}
      />
    );
  }
}

export default RunSimulation;
