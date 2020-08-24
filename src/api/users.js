import { httpClient, httpClientAuth } from './httpClient';

const END_POINT = '/users';

const login = (authDetails) =>
  httpClient.post(END_POINT + '/login', authDetails);

const getUser = (userId) => httpClientAuth.get(END_POINT + '/' + userId);

export { login, getUser };
