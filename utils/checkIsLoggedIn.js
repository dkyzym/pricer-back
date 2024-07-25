import { UnAuthorizedError } from './errors.js';

export const checkIsLoggedIn = (response, clientInfo) => {
  const isLoggedIn = response.includes(clientInfo);

  if (!isLoggedIn) {
    throw new UnAuthorizedError('Not logged in');
  }
};
