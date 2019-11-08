import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  collapsed: false,
  topNavState: 'home',
  leftNavState: 'home'
}
export default new Vuex.Store({
  state
})
