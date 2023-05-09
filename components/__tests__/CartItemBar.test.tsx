import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import CartItemBar from '../CartItemBar';

describe('CartItemBar', () => {
  const item = {
    _id: '123',
    price: 9.99,
    name: 'Test Item',
    quantity: 2
  };

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<CartItemBar {...item} />);
    expect(getByText(item.name)).toBeDefined();
    expect(getByText('$9.99 X 2 = $19.98')).toBeDefined();
    expect(getByTestId('trash-icon')).toBeDefined();
  });

  it('calls remove from cart and update cart total on trash press', () => {
    const removeFromCartMock = jest.fn();
    const updateCartTotalMock = jest.fn();
    const dispatchMock = jest.fn();
    dispatchMock.mockReturnValue({ removeFromCart: removeFromCartMock, updateCartTotal: updateCartTotalMock });

    const { getByTestId } = render(<CartItemBar {...item} />);
    fireEvent.press(getByTestId('trash-icon'));

    expect(removeFromCartMock).toHaveBeenCalledTimes(1);
    expect(removeFromCartMock).toHaveBeenCalledWith('123');
    expect(updateCartTotalMock).toHaveBeenCalledTimes(1);
    expect(updateCartTotalMock).toHaveBeenCalledWith(-2);
  });
});