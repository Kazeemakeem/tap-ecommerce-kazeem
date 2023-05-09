import axios from 'axios';
import useAxios from '../axios';
import {renderHook } from '@testing-library/react-hooks'

jest.mock('axios');

describe('useAxios', () => {
  const mockResponse = { data: [{ id: 1, name: 'John Doe' }] };
  const mockError = 'Request failed';

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return response, error, and loading state', async () => {
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useAxios({ url: '/users', method: 'get', headers: null, body: null })
    );

    expect(result.current.response).toBeNull();
    expect(result.current.error).toBe('');
    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.response).toEqual(mockResponse.data);
    expect(result.current.error).toBe('');
    expect(result.current.loading).toBe(false);
  });

  it('should handle error on failed request', async () => {
    (axios.get as jest.Mock).mockRejectedValue(mockError);

    const { result, waitForNextUpdate } = renderHook(() =>
      useAxios({ url: '/users', method: 'get', headers: null, body: null })
    );

    expect(result.current.response).toBeNull();
    expect(result.current.error).toBe('');
    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.response).toBeNull();
    expect(result.current.error).toBe(mockError);
    expect(result.current.loading).toBe(false);
  });
});