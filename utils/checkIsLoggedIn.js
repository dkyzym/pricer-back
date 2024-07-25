import { UnAuthorizedError } from './errors.js';

export const checkIsLoggedIn = async (response, clientInfo) => {
  const isLoggedIn = await response.includes(clientInfo);

  if (!isLoggedIn) {
    throw new UnAuthorizedError();
  }
};
