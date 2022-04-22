<template lang="">
    <div class="abw_cart_item_card">
        <div class="card-header cart-summary" id="headingOne">
            <div class="row">
                <div class="col-md-12">
                    <p class="text-left abw_cart_item_name" ><strong >{{ cart_item_data.item_name }}</strong></p>
                    </div>
            </div>
           
            <div class="row">
                <div class="col-md-5">
                    <p class="text-left abw_cart_item_price_label"><small>Base Price </small></p>
                </div>
                <div class="col-md-7">
                    <p class="text-right abw_cart_item_base_price"><small>
                        <strong>{{this.$store.getters.getCurrency}} {{ currency(cart_item_data.price[1]) }}</strong></small></p>
                </div>
            </div>
            
            <div v-if="cart_item_data.enhancements.length > 0" class="row">
                <div class="col-md-5">
                    <p class="text-left abw_cart_item_extras_label"><small>Extras</small></p>
                </div>
                <div class="col-md-7">
                    <p class="text-right abw_cart_item_extras_text"><small><strong>{{this.$store.getters.getCurrency}} {{ currency(enhancementsTotal) }}</strong></small></p>
                </div>
            </div>
            <div class="row mgtb-1">
                <div class="col-md-7">
                    <p class="text-left abw_cart_item_subtotal_text" style="color: #ff573d;">
                        <strong style="font-size: 14px">{{this.$store.getters.getCurrency}} {{ currency(subTotal) }}</strong>
                    </p>
                </div>
                <div class="col-md-5 d-flex justify-content-end">
                    
                    <button class="btn btn-outline-primary btn-sm abw_cart_item_details_btn" data-toggle="collapse" :data-target="'#collapse_'+cart_item_data.item_id" aria-expanded="false" aria-controls="collapseOne">
                       Details
                    </button>
                    &nbsp;
                    <div v-if="item_removing_from_cart">
                        <div class="d-flex justify-content-center">
                            <p>Removing Item..&nbsp;&nbsp;</p>
                            <div class="spinner-border text-danger" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <button 
                            class="btn btn-outline-danger btn-sm abw_cart_item_remove_btn" 
                            data-toggle="collapse" 
                            data-target="#collapseOne" 
                            aria-expanded="true" 
                            aria-controls="collapseOne"
                            v-on:click="removeFromCart">
                            <i class="fa fa-trash"></i>
                        </button>
                    </div>
                    
                </div>
            </div>
             <div :id="'collapse_'+cart_item_data.item_id" class="collapse abw_cart_item_collapsed" aria-labelledby="headingOne" data-parent="#accordion">
            <div class="card-body">
                <div v-if="cart_item_data.enhancements.length > 0" class="row">
                    <div class="col" style="background: #ffffff;">
                        <!-- <h4><span class="text" style="color: #000000;">Extras</span></h4> -->
                        <div class="row ">
                            <div class="col" style="background: #fff;">
                                <span style="background: #ffffff;font-size: 14px;text-align: left;"><strong>Extras</strong></span>
                            </div>
                        </div>
                        <div v-for="enhancement of cart_item_data.enhancements " :key="enhancement.id" class="row">
                            <div class="col" style="background: #ffffff;">
                                <p style="background: #ffffff;font-size: 12px;text-align: left;">
                                    {{enhancement.name}} x {{enhancement.qty}}</p>
                            </div>
                            <div class="col" style="background: #ffffff;">
                                <p style="background: #ffffff;font-size: 14px;text-align: right;">TZS {{ currency(enhancement.price)}}</p>
                            </div>
                        </div>
                       
                    </div>
                </div>
                <div class="mgtb-1">
                <!-- <h4><span class="text">Discount (30% Off)</span><span class="price">- TZS 6,500</span></h4> -->
                <span class=" text abw_cart_item_subtotal_text">Sub Total:&nbsp;</span><span class="price" style="color: #ff573d;">{{this.$store.getters.getCurrency}} {{ currency(subTotal) }}</span>
            </div>
            </div>
        </div><!--End of colapse-->
            
            
                
        </div>
       
    </div>
</template>
<script>
import APIService from "../../services/api_service";
import numeral from "numeral";

export default {
  name: "CartItemType1",
  props: {
    cart_item_data: Object,
  },
  data() {
    return {
      item_removing_from_cart: false,
    };
  },
  computed: {
    enhancementsTotal() {
      var total = 0;
      this.cart_item_data.enhancements.forEach((element) => {
        console.log(element);
        total = parseFloat(element.price) * element.qty + total;
      });
      return total;
    },
    subTotal() {
      var enhancement_total = this.enhancementsTotal;

      return this.cart_item_data.price[1] + enhancement_total;
    },
  },
  methods: {
    currency(value) {
      // console.log(value);
      return numeral(value).format("0,0.00");
    },
    removeFromCart() {
      this.item_removing_from_cart = true;
      var json_body = {};
      json_body = {
        cart_id: this.$store.getters.getCart.cart_id,
        item_id: this.cart_item_data.item_id,
      };

      console.log(this.$store.getters.getCart);
      APIService.removeFromCart(json_body)
        .then((json) => {
          this.$store.commit("setCart", json);
          this.item_removing_from_cart = false;
        })
        .catch((err) => {
          console.log(err);
          return err;
        })
        .then((err_data) => {
          if (err_data != undefined) {
            console.log(err_data.message);
            this.item_error_message = err_data.message;
            this.item_has_error = true;
            this.item_removing_from_cart = false;
          }
        });
    },
  },
};
</script>
<style>
</style>