import React from 'react';
import AddressForm from '../addressForm.jsx';

const AddressFormsContainer = ({
  formValuesArr,
  onNameChange,
  onStreetChange,
  onCityChange,
  onStateChange,
}) => {
  console.log(formValuesArr)
  return (
    <div>
      {formValuesArr.map((formValues, i) =>
          <AddressForm
            id={i}
            formValues={formValues}
            onNameChange={onNameChange.bind(null, i)}
            onStreetChange={onStreetChange.bind(null, i)}
            onCityChange={onCityChange.bind(null, i)}
            onStateChange={onStateChange.bind(null, i)}
            />
      )}
    </div>
  );
};

module.exports = AddressFormsContainer;
