'use strict';
const React = require('react');

var UserLogin = React.createClass({
  render: function () {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <input
          type='text'
          id='username'
          value={this.props.userValue}
          onChange={this.props.handleUserChange} />
        <input
          type='password'
          id='password'
          value={this.props.passwordValue}
          onChange={this.props.handlePasswordChange} />
        <button>Login</button>
      </form>
     );
  }
});

module.exports = UserLogin;
