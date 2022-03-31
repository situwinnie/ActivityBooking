<template lang="">
    <div id="vue-cart-summary-detail">
    <h3>Booking Summary</h3>
    <hr />
    <div class="cartItems">
        <p>
            <span class="total-price"><b>Arrival Date:</b>  {{arrivalDate}} <i class="fa fa-clock-o"></i></span> <br>
            <span class="total-price"><b>Departure Date:</b> {{departureDate}} <i class="fa fa-clock-o"></i></span> <br>
        </p>
        <p>
            <span></span> <small> <b>Book For:</b> </small>
            <span class="total-price">{{planes}}</span>
            <span></span> <small> <b>plane(s):</b></small>
        </p>
        <hr />
    </div>
    <p class="vue-act-cart-summary">
        <a v-if="cartitems != ''" class="" data-toggle="collapse" href="#cartItems" role="button" aria-expanded="false" aria-controls="cartItems">
            <span >{{cartitems.items.length}}</span>
            <span>Items selected</span>
        </a>
    </p>
    <div id="cartItems" class="collapse show">
        <div class="vue-act-cartitems" v-if="cartitems != ''">
            <div class="vue-act-cartitem" v-for="cartitem in cartitems.items" :key="cartitem.id">
                <p>
                    <span>{{cartitem.name}}</span>
                    <span class="vue-total-price"> {{formatPrice(cartitem.price)}}</span>
                </p>
            </div>
        </div>
    </div>
    <div class="vue-act-cart-total">
        <div class="row">
            <div class="col-4 cleft">
                TOTAL<small><span class="adultCount"></span></small>
            </div>
            <div class="col-8 cright">
                <span class="totalLabel" v-if="cartitems !=''">{{ currency }}{{formatPrice(cartitems.total)}}</span> <span v-else>0.00</span>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  name: "Cart2",
  props: {
    msg: String,
  },
  data(){
      return {
          currencyComponentKey : 0 , 
          currency : ""
      };
  },
  beforeMount() {
      this.$store.subscribe((mutation, state) => {
        console.log(mutation.type)
        console.log(mutation.payload)
        if(mutation.type == 'setCurrency'){
          //Trigger Reloads
          this.currency = state.currency;
          this.currencyComponentKey++;
        }
      });
  },
};
</script>
<style>
    @import url('../assets/css/main.css');
</style>