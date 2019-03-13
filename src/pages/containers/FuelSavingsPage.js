import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionFuel from '../../actions/fuelSavingsActions';
import FuelSavingsForm from '../FuelSavingsForm';

export class FuelSavingsPage extends React.Component {
  saveFuelSavings = () => {
    const { fuelSavings, actions } = this.props;
    actions.saveFuelSavings(fuelSavings);
  };

  calculateFuelSavings = e => {
    const { fuelSavings, actions } = this.props;
    const { name, value } = e.target;
    actions.calculateFuelSavings(fuelSavings, name, value);
  };

  render() {
    const { fuelSavings } = this.props;
    return (
      <FuelSavingsForm
        onSaveClick={this.saveFuelSavings}
        onChange={this.calculateFuelSavings}
        fuelSaves={fuelSavings}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    fuelSavings: state.fuelSavings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionFuel, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FuelSavingsPage);
