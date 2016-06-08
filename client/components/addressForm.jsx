'use strict';
const React = require('react');

var AddressForm = React.createClass({

  render: function () {
    return (
      <div className="row">
        <form>
          <div className="two columns">
            <label htmlFor={"friend" + this.props.id}>Name:</label>
            <input
              type="text"
              className="friendName"
              id={"friend" + this.props.id}
              value={this.props.formValues.name}
              onChange={this.props.onNameChange} />
          </div>

          <div className="two columns">
            <label htmlFor={"street" + this.props.id}>Street:</label>
            <input
              type="text"
              className="streetName"
              id={"street" + this.props.id}
              value={this.props.formValues.street}
              onChange={this.props.onStreetChange} />
          </div>

          <div className="two columns">
            <label htmlFor={"city" + this.props.id}>City:</label>
            <input
              type="text"
              className="cityName"
              id={"city" + this.props.id}
              value={this.props.formValues.city}
              onChange={this.props.onCityChange} />
          </div>

          <div className="two columns">
            <label htmlFor={"state" + this.props.id}>State:</label>
            <input
              type="text"
              className="stateName"
              id={"state" + this.props.id}
              value={this.props.formValues.state}
              onChange={this.props.onStateChange} />
          </div>
        </form>
      </div>
    );
  },

});

module.exports = AddressForm;
