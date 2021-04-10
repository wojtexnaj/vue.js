import Vue from 'vue'
import Vuex from 'vuex'
import {
  UPDATE_TODOS_OBJECT,
  UPDATE_SUPER_HEROES_OBJECT,
  UPDATE_IS_SHOW_MENU,
  UPDATE_IS_SHOW_POPUP } from './mutation-types';

Vue.use(Vuex)

const state = {
  todos_object: {
    todos: [],
    currentPaginationPage: 0
  },
  super_heroes_object: {
    sueprheroes: [],
    currentPaginationPage: 0
  },
  isShowMenu: false,
  isShowPopup: false
};

const mutations = {
  [UPDATE_TODOS_OBJECT](state, todosObject) {
    state.todos_object = todosObject;
  },
  [UPDATE_SUPER_HEROES_OBJECT](state, superHeroesObject) {
    state.super_heroes_object = superHeroesObject;
  },
  [UPDATE_IS_SHOW_MENU](state, isShowMenu) {
    state.isShowMenu = isShowMenu;
  },
  [UPDATE_IS_SHOW_POPUP](state, isShowPopup) {
    state.isShowPopup = isShowPopup;
  }
};
const actions = {
  updateTodosObject({ commit }, todosObject) {
    commit(UPDATE_TODOS_OBJECT, todosObject);
  },
  updateSuperHeroesObject({ commit }, supeHeroesObject) {
    commit(UPDATE_SUPER_HEROES_OBJECT, supeHeroesObject);
  },
  updateIsShowMenu({ commit }, isShowMenu) {
    commit(UPDATE_IS_SHOW_MENU, isShowMenu);
  },
  updateIsShowPopup({ commit }, isShowPopup) {
    commit(UPDATE_IS_SHOW_POPUP, isShowPopup);
  }

};
const getters = {
  getIsShowMenu: state => state.isShowMenu,
  getIsShowPopup: state => state.isShowPopup
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
