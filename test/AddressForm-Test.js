'use strict';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import AddressForm from '../client/components/addressForm';




describe('React unit tests: AddressForm', function() {
  const formValues = {
    name: 'test',
    street: 'codesmith street',
    city: 'codesmith town',
    state: 'codesmith state',
  }
  const addressForm = shallow(<AddressForm formValues={formValues} />);

  it('should have className row', function() {
    expect(addressForm.is('.row')).to.equal(true);
  });
  it('should have className three columns', function() {
    expect(addressForm.children().find('.two').length).to.equal(4);
  });

  it('should have className cityName', function() {
    expect(addressForm.children().find('.cityName').length).to.equal(1);
  });
  //make an addressform tag, give it id props, then check if address form child
  //has those same props

  it('AddressForm component should have property id', function() {
     const addressForm = mount(<AddressForm formValues={formValues} id={3} />);
     expect(addressForm.prop('id')).to.equal(3);
  });

});
