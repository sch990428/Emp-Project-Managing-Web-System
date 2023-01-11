import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    user_emp_id: "",
  },
  getters: {
    get_code: function (state) {
      return state.user_emp_id;
    }
  },
  mutations: {
    login: function (state, payload) {
      console.log("login", payload.employee_id);
      state.user_emp_id = payload.employee_id;
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths: ["user_emp_id"]
  })],
})
