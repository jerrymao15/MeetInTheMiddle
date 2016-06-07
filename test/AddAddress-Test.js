'use strict';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import AddAddress from '../client/components/AddAddress';

describe('AddAddress Component', function() {
  it('should have 4 input field elements', function() {
    expect(shallow(<AddAddress />).find('input').length).to.equal(4);
  });

  it('should have 1 button element', function() {
    expect(shallow(<AddAddress />).find('button').length).to.equal(1);
  });
  // it('should have one form element', function() {
  //   expect(shallow(<UserLogin />).find('form').length).to.equal(1);
  // });
});
