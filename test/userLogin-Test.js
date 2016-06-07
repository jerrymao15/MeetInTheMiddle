'use strict';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import UserLogin from '../client/components/userLogin';

describe('UserLogin Component', function() {
//two inputs and a button
//holds username and password state whilst typing occurs

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


});
