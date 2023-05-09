import React from 'react';
import { shallow } from 'enzyme';
import { ActionButton } from '../Button';
import { TouchableOpacity } from 'react-native';


describe('ActionButton', () => {
  it('renders correctly with narrow style', () => {
    const onPressHandler = jest.fn();
    const wrapper = shallow(<ActionButton text="Submit" onPressHandler={onPressHandler} isWide={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with wide style', () => {
    const onPressHandler = jest.fn();
    const wrapper = shallow(<ActionButton text="Cancel" onPressHandler={onPressHandler} isWide={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls onPressHandler when clicked', () => {
    const onPressHandler = jest.fn();
    const wrapper = shallow(<ActionButton text="Submit" onPressHandler={onPressHandler} isWide={false} />);
    wrapper.find(TouchableOpacity).simulate('press');
    expect(onPressHandler).toHaveBeenCalledTimes(1);
  });
});