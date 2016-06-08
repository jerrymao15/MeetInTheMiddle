'use strict';
const React = require('react');

var AddressForm = React.createClass({

  render: function () {
    return (
      <div className="row">
        <h4>Source Addresses</h4>
        <form>
          <div className="two columns">
            <label htmlFor={"friend" + this.props.id}>Name:</label>
            <input type="text" className="friendName" id={"friend" + this.props.id} />
          </div>

          <div className="two columns">
            <label htmlFor={"street" + this.props.id}>Street:</label>
            <input type="text" className="streetName" id={"street" + this.props.id} />
          </div>

          <div className="two columns">
            <label htmlFor={"city" + this.props.id}>City:</label>
            <input type="text" className="cityName" id={"city" + this.props.id} />
          </div>

          <div className="two columns">
            <label htmlFor={"state" + this.props.id}>State:</label>
            <input type="text" className="stateName" id={"state" + this.props.id} />
          </div>
        </form>
      </div>
    );
  },

});

module.exports = AddressForm;
