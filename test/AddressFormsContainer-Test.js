'use strict';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import App from '../client/components/App';
import AddressFormsContainer from '../client/components/containers/AddressFormsContainer';

describe('React unit tests: AddressFormsContainer', function() {
  const appWrapper = mount(<App />);
  before(function() {
    appWrapper.setState({
      currentPage: 'addressesPage',
    });
  });

  it('should have 1 AddressFormsContainer', function() {
    expect(appWrapper
      .find('AddressFormsContainer')
      .length
    ).to.equal(1);
  });

  it('should have 3 AddressForms', function() {
    appWrapper.setState({
      sourceAddressArr: [1, 2, 3],
    });
    expect(appWrapper
      .find('AddressFormsContainer')
      .find('AddressForm')
      .length
    ).to.equal(3);
  });
});
