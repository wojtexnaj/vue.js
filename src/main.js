import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faChevronRight, faBars, faTimes, faKeyboard, faTrashAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import store from './store';
import VueFormulate from '@braid/vue-formulate';

Vue.config.productionTip = false
library.add(faChevronLeft, faChevronRight, faBars, faTimes, faKeyboard, faTrashAlt, faUserPlus)
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueFormulate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
