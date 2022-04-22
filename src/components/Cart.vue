<template>
  <div class="abw_cart_card">
    <div class="abw_cart_card-body">
      <div class="abw_cart_list">
        <h3>Cart</h3>
        <div style="">
          <div class="accordion" id="accordion">
            <div v-for="cart_item of cart_data.cart_items" :key="cart_item.item_id">
                <div v-if="cart_item.cart_item_type === 1">
                  <cart-item-type-1 :cart_item_data="cart_item"  ></cart-item-type-1>
                  &nbsp;
                </div>
                &nbsp;
                <div v-else-if="cart_item.cart_item_type === 2">
                  <cart-item-type-2 :cart_item_data="cart_item"  ></cart-item-type-2>
                  &nbsp;
                </div>
                <div v-else-if="cart_item.cart_item_type === 3">
                  <cart-item-type-3 :cart_item_data="cart_item"  ></cart-item-type-3>
                  &nbsp;
                </div>
                &nbsp;
                <div v-else-if="cart_item.cart_item_type === 4">
                  <cart-item-type-4 :cart_item_data="cart_item"  ></cart-item-type-4>
                  &nbsp;
                </div>
                &nbsp;
                <div v-else-if="cart_item.cart_item_type === 5">
                  <cart-item-type-5 :cart_item_data="cart_item"  ></cart-item-type-5>
                  &nbsp;
                </div>
                &nbsp;
                <div v-else-if="cart_item.cart_item_type === 6">
                  <cart-item-type-6 :cart_item_data="cart_item"  ></cart-item-type-6>
                  &nbsp;
                </div>
                &nbsp;
                <div v-else-if="cart_item.cart_item_type === 7">
                  <cart-item-type-7 :cart_item_data="cart_item"></cart-item-type-7>
                  &nbsp;
                </div>
                &nbsp;
                <div v-else-if="cart_item.cart_item_type === 8">
                  <cart-item-type-8 :cart_item_data="cart_item"></cart-item-type-8>
                  &nbsp;
                </div>
                &nbsp;
                <div v-else-if="cart_item.cart_item_type === 9">
                  <cart-item-type-9 :cart_item_data="cart_item"></cart-item-type-9>
                  &nbsp;
                </div>
                &nbsp;
              <div v-else>Not A/B/C {{ cart_item.cart_item_type }}</div>
            </div>

            <!-- <cart-item-type-6></cart-item-type-6> -->
          </div>
        </div>

          <div class="pt-3 row">
            <div class="col-md-3">
              <span class="text abw_cart_total_text" 
                ><strong>Total</strong></span
              >
            </div>
            <div class="col-md-9">
              <span class="text-right abw_cart_total_amount"><p >
                  <strong :key="currencyComponentKey"> {{ currency }} {{ _currency(cart_data.cart_total) ?? 0 }}</strong>
                </p></span
              >
            </div>
          </div>
        <button
          class="btn btn-primary btn-block btn-lg abw_cart_checkout_btn"
          type="button"
          v-on:click="checkout"
          :key="checkoutBtnKey"
          :disabled="cart_is_empty"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import CartItemType1 from "./Cart Items/CartItemType1.vue";
import CartItemType2 from "./Cart Items/CartItemType2.vue";
import CartItemType3 from "./Cart Items/CartItemType3.vue";
import CartItemType4 from "./Cart Items/CartItemType4.vue";
import CartItemType5 from "./Cart Items/CartItemType5.vue";
import CartItemType6 from "./Cart Items/CartItemType6.vue";
import CartItemType7 from "./Cart Items/CartItemType7.vue";
import CartItemType8 from "./Cart Items/CartItemType8.vue";
import CartItemType9 from "./Cart Items/CartItemType9.vue";
import numeral from "numeral";

// import { store } from "../services/datastore_service";

export default {
  components: {
    CartItemType1,
    CartItemType2,
    CartItemType3,
    CartItemType4,
    CartItemType5,
    CartItemType6,
    CartItemType7,
    CartItemType8,
    CartItemType9,
  },
  name: "Cart",
  props: {
    msg: String,
  },
  data() {
    return {
      cart_is_empty : true ,
      checkoutBtnKey : 0 ,
      currencyComponentKey : 0 , 
      currency : ""
    };
  },
  beforeMount() {
      this.$store.subscribe((mutation, state) => {
        console.log(mutation.type)
        console.log(mutation.payload)
        console.log("Subscribtion : " , state.search_date)
        if(mutation.type == 'setCart'){
          if(state.cart.cart_items.length == 0 ){
            this.cart_is_empty = true;
          }else{
            this.cart_is_empty = false;
          }
          this.checkoutBtnKey++;
        }
        if(mutation.type == 'setCurrency'){
          //Trigger Reloads
          this.currency = state.currency;
          this.currencyComponentKey++;
        }
      });
  },
  computed: {
    cart_data() {
      console.log(this.$store.getters.getCart);
      var cart_data = this.$store.getters.getCart;
      return cart_data;
    },
  },
  methods:{
    _currency(value) {
      // console.log(value);
      return numeral(value).format("0,0.00");
    },
    checkout(){
      this.$store.commit('checkoutCart');
      // this.$router.push('/abw_checkout')
    },

  }
};
</script>
<style>






</style>