'use strict';
const React = require('react');

var SignUp = React.createClass({

  render: function () {
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="row">
          <div className="three columns">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" />
          </div>

          <div className="three columns">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" />
          </div>

          <div className="three columns">
            <label htmlFor="username">Username:</label>
            <input type="text" id="signup-username" />
          </div>

          <div className="three columns">
            <label htmlFor="password">Password:</label>
            <input type="password" id="signup-password" />
          </div>
        </div>
        <button className="button-primary" >Sign Up</button>
      </form>
    );
  },

});

module.exports = SignUp;
