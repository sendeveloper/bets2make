import React from 'react';
import GraphPage from './GraphPage';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);

    const portfolioString = localStorage.getItem('portfolioData');
    let portfolioData = [];
    try {
      portfolioData = portfolioString ? JSON.parse(portfolioString) : [];
    } catch (e) {
      console.log('parse error', e);
    }
    this.state = {
      portfolioData,
      selectedId: 0
    };
  }

  onRemoveFromPortfolio = () => {
    const { portfolioData, selectedId } = this.state;
    if (selectedId !== -1) {
      let newId = selectedId;
      portfolioData.splice(selectedId, 1);
      if (newId >= portfolioData.length) {
        newId = portfolioData.length - 1;
      }
      this.setState({ portfolioData, selectedId: newId });
      localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    } else {
      alert('Please select graph');
    }
  };

  onSelectId = id => {
    this.setState({ selectedId: id });
  };

  render() {
    const { history } = this.props;
    const { state } = history.location;
    const { portfolioData, selectedId } = this.state;

    return (
      <GraphPage
        tableData={portfolioData}
        graphData={
          portfolioData[selectedId] ? portfolioData[selectedId].betsList : []
        }
        selectedId={selectedId}
        showBackButton={!!state}
        portfolio
        onSelectId={this.onSelectId}
        onRemoveFromPortfolio={this.onRemoveFromPortfolio}
        loading={false}
        history={history}
      />
    );
  }
}

export default Portfolio;
