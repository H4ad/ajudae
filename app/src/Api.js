import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'https://127.0.0.1:8000/api';

export default {
  signIn: async (email, password) => {
    return await fetch(`${BASE_API}/auth/local`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
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
  createOng: async (payload) => {
    const token = await AsyncStorage.getItem('ajudae@token');

    return await fetch(`${BASE_API}/ongs`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(payload),
    })
      .then(async (request) => await request.json())
      .catch(() => null);
  },
  updateOng: async (ongId, payload) => {
    const token = await AsyncStorage.getItem('ajudae@token');

    return await fetch(`${BASE_API}/ongs/${ongId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(payload),
    })
      .then(async (request) => await request.json())
      .catch(() => null);
  },
  getOngsByUser: async (userId) => {
    const token = await AsyncStorage.getItem('ajudae@token');

    const request = await fetch(`${BASE_API}/ongs?userId=${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    return await request.json().then(response => response.data);
  },
  getOngs: async (page) => {
    const request = await fetch(`${BASE_API}/ongs?page=${page}&limit=8`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return await request.json();
  },
  getCausesByOng: async (ongId, page) => {
    const token = await AsyncStorage.getItem('ajudae@token');

    const request = await fetch(
      `${BASE_API}/causes?relations=ong&ongId=${ongId}&page=${page}&limit=8`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );

    return request.json();
  },
  getCauses: async (queryKey, page) => {
    const token = await AsyncStorage.getItem('ajudae@token');

    const request = await fetch(
      `${BASE_API}/causes?relations=ong&page=${page}&limit=8`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );

    return request.json();
  },
  getExpiredCausesByOng: async (ongId, page) => {
    const token = await AsyncStorage.getItem('ajudae@token');

    const request = await fetch(
      `${BASE_API}/causes?relations=ong&filterBy=expired&ongId=${ongId}&page=${page}&limit=8`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );

    return await request.json();
  },
  getOngById: async (queryKey, ongId) => {
    const token = await AsyncStorage.getItem('ajudae@token');

    const request = await fetch(`${BASE_API}/ongs/${ongId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    return request.json();
  },
  deleteCause: async (causeId) => {
    const token = await AsyncStorage.getItem('ajudae@token');

    const request = await fetch(`${BASE_API}/causes/${causeId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    return { success: request.ok };
  },
  createCause: async (payload) => {
    const token = await AsyncStorage.getItem('ajudae@token');

    console.log(payload);

    return await fetch(`${BASE_API}/causes`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(payload),
    })
      .then(async (request) => await request.json())
      .catch(() => null);
  },
};
