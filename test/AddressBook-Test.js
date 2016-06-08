'use strict';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import AddressBook from '../client/components/addressBook';

describe('React unit test Addressbook', function() {
  it('Should have n p elements', function() {
    expect(shallow(<AddressBook />).children('p').length).to.equal(1);
  });
});
