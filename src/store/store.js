import Vue from 'vue'
import Vuex from 'vuex'

import idbs from '../db/db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: [],
    dataFields: ['contacts'],
  },
  mutations: {
    setState(state, { field, data }) {
      Vue.set(state, field, data)
    },
    addContact(state, contact) {
      state.contacts.push(contact)
    },
    editContact(state, { index, contact }) {
      state.contacts[index] = contact
    },
    deleteContact(state, index) {
      state.contacts.splice(index, 1)
    },
  },
  actions: {
    addContact({ commit, dispatch }, contact) {
      commit('addContact', contact)
      dispatch('saveContacts')
    },
    editContact({ commit, dispatch }, { index, contact }) {
      commit('editContact', { index, contact })
      dispatch('saveContacts')
    },
    deleteContact({ commit, dispatch }, index) {
      commit('deleteContact', index)
      dispatch('saveContacts')
    },
    loadStorage({ state, commit }) {
      state.dataFields.forEach(async (field) => {
        try {
          let data = await idbs.loadStorage(field)
          // Missing or corrupted
          if (data === undefined) data = []
          // Missing or corrupted
          if (data === null) data = []
          commit('setState', { field, data })
        } catch (e) {
          // Missing or corrupted
          commit('setState', { field, data: [] })
        }
      })
    },
    async saveContacts({ state }) {
      try {
        await Promise.all(
          state.dataFields.map((field) =>
            idbs.saveToStorage(field, state[field])
          )
        )
      } catch (e) {
        console.log(e)
      }
    },
  },
})
