import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import CategoryCard, { CategoryCardsProps } from '../CategoryCard';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('CategoryCard', () => {
  const mockProps: CategoryCardsProps = {
    _id: '1',
    name: 'Test Category',
    description: 'A test category for unit tests',
  };

  beforeEach(() => {
    //@ts-ignore
    useNavigation.mockReturnValue({
      navigate: jest.fn(),
    });
  });

  it('should render the category name and description', () => {
    const { getByText } = render(<CategoryCard {...mockProps} />);
    expect(getByText('Test Category')).toBeDefined();
    expect(getByText('A test category for unit tests')).toBeDefined();
  });

  it('should call navigation function on press', () => {
    const { getByTestId } = render(<CategoryCard {...mockProps} />);
    fireEvent.press(getByTestId('category-card'));
    expect(useNavigation().navigate).toHaveBeenCalledWith('Products', {
      _id: '1',
      name: 'Test Category',
    });
  });
});
