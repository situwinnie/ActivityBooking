import { createApp } from 'vue'
import App from './App.vue'
import { store } from "./services/vstore_service";

// import dayjs from 'dayjs'


import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'


import 'bs-stepper/dist/css/bs-stepper.min.css'
import 'bs-stepper/dist/js/bs-stepper.min.js'

// import ActivityBookingWidget from "./components/ActivityBookingWidget.vue";
// import CheckoutInfo from "./components/CheckoutInfo.vue";

// import {createRouter, createWebHashHistory} from "vue-router";
// import MainStepper from './components/MainStepper.vue';
// import PaymentProcessing from './components/PaymentProcessing.vue';


// const routes = [
//     { path: '/', component: MainStepper },
//     { path: '/abw_checkout', component: CheckoutInfo },
//     { path: '/processing', component: PaymentProcessing },
//   ]


// const router = createRouter({
//     // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
//     history: createWebHashHistory(),
//     routes
//   })

const app = createApp(App)

// app.config.globalProperties.$dayjs = dayjs


app.use(store)
// app.use(router)
app.mount('#app')