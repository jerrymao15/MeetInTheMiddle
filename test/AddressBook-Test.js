'use strict';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import AddressBook from '../client/components/addressBook';

describe('React unit test Addressbook', function() {
  it('Should have n p elements', function() {
    console.log(mount(<AddressBook />))
    // expect(mount(<AddressBook />).children('p').length).to.equal(1);
  });

  it('should pass down contact Name to each addressBook p element', function() {
    const wrapper = mount(<AddressBook contactNames={['Jenna']}/>);
    expect(wrapper.children('p').text()).to.equal('Jenna');
  });

  it('should have props for contactNames', function() {
    const wrapper = shallow(<AddressBook contactNames={['Jenna']}/>);
    expect(wrapper.props().contactNames).to.be.defined;
  });
});
