import axios from "axios";

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
}

const state: AuthState = {
  token: localStorage.getItem("token") || null,
  user: null,
  isAuthenticated: false,
};

const mutations = {
  setToken(state: AuthState, token: string | null) {
    state.token = token;
    state.isAuthenticated = !!token;
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  },
  setUser(state: AuthState, user: any | null) {
    state.user = user;
  },
};

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface ActionContext {
  commit: (type: string, payload?: any) => void;
}

const actions = {
  async register({ commit }: ActionContext, payload: RegisterPayload) {
    const { username, email, password } = payload;
    const response = await axios.post("http://localhost:3000/auth/register", {
      username,
      email,
      password,
    });
    return true;
  },

  async login({ commit }: ActionContext, payload: LoginPayload) {
    const { email, password } = payload;
    const { data } = await axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    });
    commit("setToken", data.token);
    commit("setUser", { id: data.userId, username: data.username });
    return true;
  },

  logout({ commit }: ActionContext) {
    commit("setToken", null);
    commit("setUser", null);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
