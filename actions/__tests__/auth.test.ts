import { setItem, getItem, authenticate } from '../auth';
import * as SecureStore from 'expo-secure-store';

describe('setItem', () => {
  it('should correctly set the key-value pair', async () => {
    const key = 'test-key';
    const value = 'test-value';
    const mockSetItemAsync = jest.spyOn(SecureStore, 'setItemAsync').mockResolvedValue();
    await setItem(key, value);
    expect(mockSetItemAsync).toHaveBeenCalledWith(key, value);
  });

  it('should log an error in case of failure', async () => {
    const key = 'test-key';
    const value = 'test-value';
    const errorMessage = 'test-error';
    const mockSetItemAsync = jest.spyOn(SecureStore, 'setItemAsync').mockRejectedValue(new Error(errorMessage));
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    await setItem(key, value);
    expect(mockSetItemAsync).toHaveBeenCalledWith(key, value);
    expect(mockConsoleLog).toHaveBeenCalledWith(new Error(errorMessage));
  });
});

describe('getItem', () => {
  it('should return the value for the given key if found', async () => {
    const mockGetItemAsync = jest.spyOn(SecureStore, 'getItemAsync').mockResolvedValue('test-value');
    const key = 'test-key';
    const result = await getItem(key);
    expect(mockGetItemAsync).toHaveBeenCalledWith(key);
    expect(result).toEqual('test-value');
  });

  it('should return false if the key is not found', async () => {
    const mockGetItemAsync = jest.spyOn(SecureStore, 'getItemAsync').mockResolvedValue(null);
    const key = 'test-key';
    const result = await getItem(key);
    expect(mockGetItemAsync).toHaveBeenCalledWith(key);
    expect(result).toEqual(false);
  });
});

describe('authenticate', () => {
  it('should call setItem and next with the correct arguments', async () => {
    const data = { token: 'test-token' };
    const next = jest.fn();
    const mockSetItem = jest.spyOn(module.exports, 'setItem').mockImplementation(() => {});
    authenticate(data, next);
    expect(mockSetItem).toHaveBeenCalledWith('Tap', data.token);
    expect(next).toHaveBeenCalled();
  });
});