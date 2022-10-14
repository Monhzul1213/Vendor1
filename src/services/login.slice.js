import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: '',
  url: 'http://192.168.1.220:3737/VendorSystem.asmx/',

  user: null,
  collapsed: false,
  visible: false,
  vendID: null,
  vendor: null,
  order: null,
  webUser: null,
  vendorUser: null,
  toRemember: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload.user;
      state.webUser = action.payload.user;
      // state.url = action.payload?.url;
      console.log(action.payload)
      state.toRemember = action.payload?.toRemember;
    },
    setLogin: (state, action) => {
      state.user = action.payload;
      console.log(state)
      state.url = action.payload?.url;
      state.webUser = action.payload?.webUser;
      state.toRemember = action.payload?.toRemember;
    },
    setVendorUser: (state, action) => {
      state.vendorUser = action.payload;
    },
    setWebUser: (state, action) => {
      state.webUser = action.payload;
    },
    logout: state => {
      state.user = null;
      state.token = null;
    },
    setCollapsed: state => {
      state.collapsed = !state.collapsed;
    },
    setVisible: state => {
      state.visible = !state.visible;
    },
    setVendID: (state, action) => {
      state.vendID = action.payload;
    },
    // setOrder: (state, action) => {
    //   console.log(action.payload);
    //   state.order = action.payload;
    // },
  }
});

export const apiLogin = (email, password) => async dispatch => {
  try {
    console.log(initialState.url, email, password);
    const response = await fetchRetry(initialState.url + 'Login', { email, password });
    console.log(response);
    if(response?.error_code){
      return Promise.resolve({ error: response?.description });
    } else {
      dispatch(setToken(response?.access_token));
      dispatch(setUser({ email, password }));
      return Promise.resolve({ error: null, token: response?.access_token });
    }
  } catch (err) {
    return Promise.resolve({ error: err?.toString() });
  }
};

function fetchRetry(url, auth, retries = 5) {
  return axios.post(url, {}, { auth })
    .then(res => {
      return res?.data;
    }).catch(error => {
      if(error?.message === 'Network Error' && retries > 0){
        console.log('retrying network', retries);
        return fetchRetry(url, auth, retries - 1)
      }
    });
}

export const { setToken, setUser, login, logout, setCollapsed, setVisible, setVendID, setOrder, setLogin } = loginSlice.actions;

export const loginReducer = loginSlice.reducer;