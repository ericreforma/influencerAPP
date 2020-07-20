import axios from 'axios';
import firebase from 'react-native-firebase';
import { API, FORM_API } from '../config/api';
import { TokenSchema } from '../database';

let httpRequest;

export const HttpRequest = {
  get: async (url, args = {}) => {
    const token = await firebase.auth().currentUser.getIdToken();
    API.headers.Authorization = `Bearer ${token}`;

    httpRequest = axios.create(API);
    const tokenSchema = TokenSchema.get();
    Object.assign(args, { uid: tokenSchema.uid });
    return httpRequest.get(url, { params: args });
  },
  post: async (url, args = {}) => {

    const token = await firebase.auth().currentUser.getIdToken();
    API.headers.Authorization = `Bearer ${token}`;

    httpRequest = axios.create(API);
    const tokenSchema = TokenSchema.get();
    Object.assign(args, { uid: tokenSchema.uid });
    return httpRequest.post(url, args);
  }
};

export const HttpForm = {
  post: async (url, formData, args = {}) => {
    const token = await firebase.auth().currentUser.getIdToken();
    const api = FORM_API();

    api.headers.Authorization = `Bearer ${token}`;

    httpRequest = axios.create(api);
    const tokenSchema = TokenSchema.get();
    formData.append('uid', tokenSchema.uid);

    return httpRequest.post(url, formData, args);
  }
};

export const RawHttpRequest = {
  get: (url) => {
    httpRequest = axios.create(API);
    return httpRequest.get(url);
  },
  post: (url, args = {}) => {
    httpRequest = axios.create(API);
    return httpRequest.post(url, args);
  }
};
