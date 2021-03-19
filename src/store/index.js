import { createStore } from "vuex";

export default createStore({
  state: {
    preguntas: [],
  },
  mutations: {
    setTrivia(state, payload) {
      state.preguntas = payload;
    },
  },
  actions: {
    async getPreguntas({ commit }) {
      try {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=10&type=multiple`
        );
        const data = await res.json();
        await commit("setTrivia", data.results);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
