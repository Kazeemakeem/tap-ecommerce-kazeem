import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://lab-ecom-api-4c56x6bkca-uc.a.run.app/api/v1';

export type AxiosParams = {
  url: string;
  method: 'get' | 'post';
  body: string | null;
  headers: string | null
} 

const useAxios = ({ url, method, body, headers } : AxiosParams) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
			axios[method](url, JSON.parse(headers as string), JSON.parse(body as string))
				.then((res) => {
						setResponse(res.data);
				})
				.catch((err) => {
						setError(err);
				})
				.finally(() => {
						setloading(false);
				});
    };

    useEffect(() => {
        method === 'get' && fetchData();
    }, [method, url, body, headers]);

    return { response, error, loading };
};

export default useAxios;

export const axiosAuth = (user, url) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);
  // const API = 'https://lab-ecom-api-4c56x6bkca-uc.a.run.app/api/v1'
  console.log(API)
    axios.get(url, {
      method: 'POST',
      headers: ({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }),
      data: {
        data: user
      }
    })
    .then((res) => {
      setResponse(res.data);
    })
    .catch((err) => {
        setError(err);
    })
    .finally(() => {
        setloading(false);
    })
  return { response, error, loading }
}