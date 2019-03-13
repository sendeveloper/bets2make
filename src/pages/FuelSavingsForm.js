import React from 'react';
import { func } from 'prop-types';
import FuelSavingsResults from './FuelSavingsResults';
import FuelSavingsTextInput from './FuelSavingsTextInput';
import { fuelSavings } from '../types';

const FuelSavingsForm = ({ fuelSaves, onSaveClick, onChange }) => (
  <div>
    <h2>Fuel Savings Analysis</h2>
    <table>
      <tbody>
        <tr>
          <td>
            <label htmlFor="newMpg">New Vehicle MPG</label>
          </td>
          <td>
            <FuelSavingsTextInput
              onChange={onChange}
              name="newMpg"
              value={fuelSaves.newMpg}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="tradeMpg">Trade-in MPG</label>
          </td>
          <td>
            <FuelSavingsTextInput
              onChange={onChange}
              name="tradeMpg"
              value={fuelSaves.tradeMpg}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="newPpg">New Vehicle price per gallon</label>
          </td>
          <td>
            <FuelSavingsTextInput
              onChange={onChange}
              name="newPpg"
              value={fuelSaves.newPpg}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="tradePpg">Trade-in price per gallon</label>
          </td>
          <td>
            <FuelSavingsTextInput
              onChange={onChange}
              name="tradePpg"
              value={fuelSaves.tradePpg}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="milesDriven">Miles Driven</label>
          </td>
          <td>
            <FuelSavingsTextInput
              onChange={onChange}
              name="milesDriven"
              value={fuelSaves.milesDriven}
            />
            miles per
            <select
              name="milesDrivenTimeframe"
              onChange={onChange}
              value={fuelSaves.milesDrivenTimeframe}
            >
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="modified">Date Modified</label>
          </td>
          <td id="modified">{fuelSaves.dateModified}</td>
        </tr>
      </tbody>
    </table>

    <hr />

    {fuelSaves.necessaryDataIsProvidedToCalculateSavings && (
      <FuelSavingsResults savings={fuelSaves.savings} />
    )}
    <input type="submit" value="Save" onClick={onSaveClick} />
  </div>
);

FuelSavingsForm.propTypes = {
  onSaveClick: func.isRequired,
  onChange: func.isRequired,
  fuelSaves: fuelSavings.isRequired
};

export default FuelSavingsForm;
