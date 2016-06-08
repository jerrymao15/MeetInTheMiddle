'use strict';
const React = require('react');

var SignUp = React.createClass({

  render: function () {
    return (
      <div className="sixteen columns">
        <form
          onSubmit={this.props.onSubmit}
          className="four columns offset-by-five">
          <div className="row">
            <div className="five columns">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" />
            </div>
          </div>
          <div className="row">
            <div className="five columns">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" />
            </div>
          </div>
          <div className="row">
            <div className="five columns">
              <label htmlFor="username">Username</label>
              <input type="text" id="signup-username" />
            </div>
          </div>
          <div className="row">
            <div className="five columns">
              <label htmlFor="password">Password</label>
              <input type="password" id="signup-password" />
            </div>
          </div>
          <button className="button-primary" >Sign Up</button>
        </form>
      </div>
    );
  },

});

module.exports = SignUp;
