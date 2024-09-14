import { createStore } from 'vuex';

const getDefaultState = () => ({
  usuario: JSON.parse(localStorage.getItem('usuario')) || null,
  token: localStorage.getItem('token') || null,
});

export default createStore({
  state: getDefaultState(),
  mutations: {
    setUsuario(state, usuario) {
      state.usuario = usuario;
    },
    setToken(state, token) {
      state.token = token;
    },
    clearUsuario(state) {
      state.usuario = null;
      state.token = null;
    },
  },
  actions: {
    login({ commit }, { usuario, token }) {
      commit('setUsuario', usuario);
      commit('setToken', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('token', token);
    },
    logout({ commit }) {
      commit('clearUsuario');
      localStorage.removeItem('usuario');
      localStorage.removeItem('token');
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    getUsuario: (state) => state.usuario,
  },
});
