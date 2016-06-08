import React from 'react';
import AddressForm from '../addressForm.jsx';

const AddressFormsContainer = ({
  formValuesArr,
  onNameChange,
  onStreetChange,
  onCityChange,
  onStateChange,
  onClose
}) => {
  return (
    <div>
      {formValuesArr.map((formValues, i) =>
          <AddressForm
            id={i}
            key={i}
            formValues={formValues}
            onNameChange={onNameChange.bind(null, i)}
            onStreetChange={onStreetChange.bind(null, i)}
            onCityChange={onCityChange.bind(null, i)}
            onStateChange={onStateChange.bind(null, i)}
            onClose ={onClose.bind(null, i)}
            />
      )}
    </div>
  );
};

module.exports = AddressFormsContainer;
