'use strict';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import UserLogin from '../client/components/userLogin';

describe('UserLogin Component', function() {

  it('should have one form element', function() {
    expect(shallow(<UserLogin />).find('form').length).to.equal(1);
  });

  it('should have two input elements' , function() {
    expect(shallow(<UserLogin />).children('input').length).to.equal(2);
  });

  it('should have one button element', function() {
    expect(shallow(<UserLogin />).children('button').length).to.equal(1);
  });
  
  it('should have username value in input element', function() {
    const userVal = mount(<UserLogin userValue={'bjdelro'}/>);
    expect(userVal.find('#username').prop('value')).to.equal('bjdelro');
  });

  it('should have password value in input element', function() {
    const passwordVal = mount(<UserLogin passwordValue={'abc123'}/>);
    expect(passwordVal.find('#password').prop('value')).to.equal('abc123');
  });

  it('should have form with onSubmit handler', function() {
    const testHandleSubmitFn = function(e) {}
    const userLogin = shallow(<UserLogin handleSubmit={testHandleSubmitFn}/>);
    expect(typeof userLogin.find('form').prop('onSubmit')).to.equal('function');
    expect(userLogin.find('form').prop('onSubmit')).to.deep.equal(testHandleSubmitFn);
  });

  it('should have username input with onChange handler', function() {
    const testOnChangeFn = function(e) {};
    const userName = mount(<UserLogin handleUserChange={testOnChangeFn}/>).find('#username');
    expect(typeof userName.prop('onChange')).to.equal('function');
    expect(userName.prop('onChange')).to.deep.equal(testOnChangeFn);
  });

  it('should have password input with onChange handler', function() {
    const testOnChangeFn = function(e) {};
    const password = mount(<UserLogin handlePasswordChange={testOnChangeFn}/>).find('#password');
    expect(typeof password.prop('onChange')).to.equal('function');
    expect(password.prop('onChange')).to.deep.equal(testOnChangeFn);
  });
});
