'use strict';
const React = require('react');

var UserLogin = React.createClass({

  render: function () {
    return (
      <form>
        <input id='username' value={this.props.userValue}/>
        <input id='password' value={this.props.passwordValue}/>
        <button></button>
      </form>

     );
  }

});

module.exports = UserLogin;
