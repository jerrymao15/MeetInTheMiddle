'use strict';

const React = require('react');

const AddAddress = ({
  handleAddAddress,
  handleChangeAddName,
  handleChangeAddStreet,
  handleChangeAddCity,
  handleChangeAddState,
}) =>
  <div>
    <h4>Add Address</h4>
    <form onSubmit={handleAddAddress}>
      <input type="text" onChange={handleChangeAddName} placeholder="Name"/>
      <input type="text" onChange={handleChangeAddStreet} placeholder="Street"/>
      <input type="text" onChange={handleChangeAddCity} placeholder="City"/>
      <input type="text" onChange={handleChangeAddState} placeholder="State"/>
      <button>Add</button>
    </form>
  </div>

module.exports = AddAddress;
