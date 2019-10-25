import React from 'react';
import { shallow } from 'enzyme';
import Ones_TextArea from './index';

it('renders with Ones_TextArea', () => {
  const wrapper = shallow(<Ones_TextArea />);
  expect(wrapper.find('TextArea').length).toBe(1);
});

it('renders with Ones_TextArea', () => {
  const editable = undefined;
  const wrapper = shallow(<Ones_TextArea editable={editable} />);
  expect(wrapper.find('TextArea').length).toBe(1);
});

it('renders with Ones_TextArea', () => {
  const editable = true;
  const wrapper = shallow(<Ones_TextArea editable={editable} />);
  expect(wrapper.find('TextArea').length).toBe(1);
});

it('renders with Ones_TextArea', () => {
  const editable = false;
  const wrapper = shallow(<Ones_TextArea editable={editable} />);
  expect(wrapper.find('span').length).toBe(1);
});
