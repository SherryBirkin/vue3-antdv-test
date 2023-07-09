import req from '../request';

export const accountLogin = (data) => {
  return req({
    url: 'account/login',
    method: 'POST',
    data,
  });
};
