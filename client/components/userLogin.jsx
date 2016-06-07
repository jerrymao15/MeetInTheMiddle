'use strict';
const React = require('react');

var UserLogin = React.createClass({
  render: function () {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <input
          id='username'
          value={this.props.userValue}
          onChange={this.props.handleUserChange} />
        <input
          id='password'
          value={this.props.passwordValue}
          onChange={this.props.handlePasswordChange} />
        <button>Sign Up</button>
      </form>
     );
  }
});

module.exports = UserLogin;
