import React from 'react';

const FuelSavingsTextInput = ({ name, value, placeholder, onChange }) => {
  return (
    <input
      className="small"
      name={name}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default FuelSavingsTextInput;
