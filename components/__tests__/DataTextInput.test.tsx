import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import DataTextInput from '../DataTextInput'

describe('DataTextInput component', () => {
  const fieldNameMock = "Test field";
  const stringedNameMock = "test_field";
  const placeholderTextMock = "Test placeholder";
  const handleChangeMock = jest.fn();

  it('data text input renders correctly', () => {
    const { getByPlaceholderText } = render(<DataTextInput 
      fieldName={fieldNameMock}
      stringedName={stringedNameMock}
      placeholderText={placeholderTextMock}
      secureInput={false}
      handleChange={handleChangeMock} 
    />)

    const textInput = getByPlaceholderText(placeholderTextMock);
    expect(textInput).toBeDefined();
    expect(textInput).toHaveBeenCalledWith(getByPlaceholderText);
  })
})
