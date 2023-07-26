const httpConfig = {
  mode: 'cors', // no-cors, cors, *same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
};

const http = {
  get: () => ({
    method: 'GET',
    ...httpConfig,
  }),
  post: (payload) => ({
    method: 'POST',
    ...httpConfig,
    body: JSON.stringify(payload),
  }),
  put: (payload) => ({
    method: 'PUT',
    ...httpConfig,
    body: JSON.stringify(payload),
  }),
  delete: () => ({
    method: 'DELETE',
    ...httpConfig,
  }),
  upload: (payload) => ({
    method: 'POST',
    ...httpConfig,
    headers: {},
    body: payload,
  }),
};

export default http;
