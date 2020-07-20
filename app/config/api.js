import { URL } from './url';
import { TokenSchema } from '../database';

const baseURL = URL.SERVER_API;
const timeout = 30000; //30 seconds
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': '*'
};

const API = {
  baseURL,
  timeout,
  headers
};

const TOKENIZED_API = () => {
  const schema = TokenSchema.get();
  const api = API;
  api.headers.Authorization = `Bearer ${schema.token}`;

  return api;
};

const FORM_API = () => {
  const api = TOKENIZED_API();
  api.headers['Content-Type'] = 'multipart/form-data';

  return api;
};

export { API, TOKENIZED_API, FORM_API };
