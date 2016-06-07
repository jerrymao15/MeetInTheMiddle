'use strict';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import App from '../client/components/app';


describe("Add UserLogin to SignUp page", function() {
  it("should have user login component", function() {
    expect(mount(<App />).find('UserLogin').length).to.equal(1);
  });

  it('should have 5 props being passed down', function() {
    const wrapper = mount(<App />).find('UserLogin').props();
    expect(Object.keys(wrapper).length).to.equal(5);
  });
});
