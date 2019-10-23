import React from 'react';
import { shallow } from 'enzyme';
import Buttons from './index';

it('DMButton renders with Result', () => {
  const wrapper = shallow(<Buttons />);
  expect(wrapper.find('button').length).toEqual(1)
})
