export const setCookie = (res, name, value) => {
  res.cookie(name, JSON.stringify(value), {
    httpOnly: true,
  });
};

export const clearCookie = (res, name) => {
  res.clearCookie(name);
};
