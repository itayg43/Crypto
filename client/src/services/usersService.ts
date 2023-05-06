import backendApiClient, {
  BackendApiRoute,
  tokenHeaderKey,
  setBackendApiClientTokenHeader,
} from '../clients/backendApiClient';
import {User} from '../redux/user/userSlice';
import tokenStorage from '../utils/tokenStorage';

const USERS_ROUTE = BackendApiRoute.users;

const registerUser = async (values: any) => {
  const {headers, data} = await backendApiClient.post<User>(
    `/${USERS_ROUTE}/register`,
    values,
  );
  const token = headers[tokenHeaderKey];
  setBackendApiClientTokenHeader(token);
  await tokenStorage.set(token);
  return data;
};

const loginUser = async (values: any) => {
  const {headers, data} = await backendApiClient.post<User>(
    `/${USERS_ROUTE}/login`,
    values,
  );
  const token = headers[tokenHeaderKey];
  setBackendApiClientTokenHeader(token);
  await tokenStorage.set(token);
  return data;
};

const tryAuthenticateUser = async () => {
  const token = await tokenStorage.get();
  if (!token) {
    return null;
  }
  setBackendApiClientTokenHeader(token);
  const {data} = await backendApiClient.get<User>(
    `/${USERS_ROUTE}/authenticate`,
  );
  return data;
};

const logoutUser = async () => {
  await tokenStorage.remove();
};

export default {
  registerUser,
  loginUser,
  tryAuthenticateUser,
  logoutUser,
};
