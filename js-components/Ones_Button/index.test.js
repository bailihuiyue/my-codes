import React from 'react';
import { mount } from 'enzyme';
import Buttons from './index';

it('Ones_Button renders with Result', () => {
  const wrapper = mount(<Buttons />);
  expect(wrapper.find('button').length).toEqual(1)
})
