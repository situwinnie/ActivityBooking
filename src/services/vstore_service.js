
import { createStore } from 'vuex'

export const store = createStore({
    state() {
        return {
            search_date : "",
            payment_link : "",
            payment_iframe : "",
            currency:"",
            cart: {
                cart_total: 0,
                cart_items: []
            }
        }
    },
    mutations: {
        setCart(state, new_cart) {
            state.cart = new_cart;
        },
        clearCart(state) {
            state.cart =  {
                cart_total: 0,
                cart_items: []
            };
        },
        setSearchDate(state , search_date){
            state.search_date = search_date;
        },
        setPaymentLink(state , payment_link){
            state.payment_link = payment_link;
        },
        setPaymentIframe(state , payment_link){
            state.payment_iframe = payment_link;
        },
        setCurrency(state , currency){
            state.currency = currency;
        },
        checkoutCart(){
        }
    },
    getters: {
        getPaymentIframe(state){
            return state.payment_iframe ;
        },
        getCart(state) {
            return state.cart
        },
        getSearchDate(state) {
            return state.search_date
        },
        getPaymentLink(state) {
            return state.payment_link
        },
        getCurrency(state) {
            return state.currency
        }
    }
})