import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store';
import dateFilter from './filters/date.filter';
import currencyFilter from './filters/currency.filter';
import messagePlugin from './utils/message.plugin';
import Loader from './components/app/Loader';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.component('Loader', Loader);

firebase.initializeApp({
  apiKey: "AIzaSyB48wPhuw0BCAJpRO5NgT7aDzuEmPz6eCQ",
  authDomain: "vue-crm-bbe33.firebaseapp.com",
  databaseURL: "https://vue-crm-bbe33.firebaseio.com",
  projectId: "vue-crm-bbe33",
  storageBucket: "vue-crm-bbe33.appspot.com",
  messagingSenderId: "712613726514",
  appId: "1:712613726514:web:4ebf111fc2cb27497b6f2b"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
})
