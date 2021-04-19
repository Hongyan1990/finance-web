import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default function createStore() {
  return new Vuex.Store({
    state: {
      username: '',
      userid: '',
      count: 0
    },
    actions: {
      saveUsername({commit}, name) {
        commit('setUsername', {name})
      },
      saveUserid({commit}, id) {
        commit('setUserid', {id})
      },
      saveCarBookCount({commit}, count) {
        commit('setCarBookCount', {count})
      }
    },
    mutations: {
      setUsername(state, {name}) {
        state.username = name
      },
      setUserid(state, {id}) {
        state.userid = id
      },
      setCarBookCount(state, {count}) {
        state.count = count
      }
    }
  })
}