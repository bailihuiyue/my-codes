import React from 'react';
import { shallow } from 'enzyme';
import Ones_Select from './index';

it('renders with Ones_Select', () => {
  const wrapper = shallow(<Ones_Select />);
  expect(wrapper.find('Select').length).toBe(1);
  expect(wrapper.find('Select').prop('className')).toBe('compo__select');
});
