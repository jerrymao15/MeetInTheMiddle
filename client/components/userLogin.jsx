'use strict';
const React = require('react');

var UserLogin = React.createClass({
  render: function () {
    return (
      <div style={{marginTop: 150}} className="sixteen columns">
        <form
          className="four columns offset-by-five"
          onSubmit={this.props.handleSubmit}>
          <input
            type='text'
            id='username'
            value={this.props.userValue}
            onChange={this.props.handleUserChange}
            placeholder="Enter Username" />
          <br/>
          <input
            type='password'
            id='password'
            value={this.props.passwordValue}
            onChange={this.props.handlePasswordChange}
            placeholder="Enter password" />
          <br/>
          <button>Login</button>
          <br/>
          <a
            href="#"
            style={{fontSize: 10}}
            onClick={this.props.onClick}>
            Register an account
          </a>
        </form>
      </div>
     );
  }
});

module.exports = UserLogin;
