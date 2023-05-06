import axios from 'axios';

const backendApiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default backendApiClient;

export enum BackendApiRoute {
  users = 'users',
  holdings = 'holdings',
}

export const tokenHeaderKey = 'x-token';

export const setBackendApiClientTokenHeader = (token: string) => {
  backendApiClient.defaults.headers.common[tokenHeaderKey] = token;
};
