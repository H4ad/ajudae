import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'https://facens-ajudae-api.herokuapp.com';

export default {
  signIn: async (username, password) => {
    return await fetch(`${BASE_API}/auth/local`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(async (request) => await request.json())
      .catch(() => null);
  },
  signUp: async (name, email, password) => {
    const req = await fetch(`${BASE_API}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await req.json();
    return json;
  },
  getMe: async () => {
    const token = await AsyncStorage.getItem('ajudae@token');

    return await fetch(`${BASE_API}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(async (request) => await request.json())
      .catch(() => null);
  },
};