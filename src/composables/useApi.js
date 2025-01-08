import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/',
});

export function useApi() {
  const get = (url) => apiClient.get(url);
  const post = (url, data) => apiClient.post(url, data);
  const put = (url, data) => apiClient.put(url, data);
  const del = (url) => apiClient.delete(url);

  return { get, post, put, del };
}
