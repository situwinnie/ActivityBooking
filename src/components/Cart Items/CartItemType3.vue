<template lang="">
    <div class="card transparent">
        <div class="card-header cart-summary" id="headingOne">
            <div class="row">
                <div class="col-md-12">
                    <p class="text-left abw_cart_item_name"><strong >{{ cart_item_data.item_name }}</strong></p>
                    </div>
            </div>         
            <div class="row">
                <div class="col-md-5">
                    <p class="text-left abw_cart_item_price_label"><small>{{ cart_item_data.item_qty}} Pc(s)</small></p>
                </div>
                <div class="col-md-7">
                    <p class="text-right abw_cart_item_base_price"><small>
                        <strong>{{this.$store.getters.getCurrency}}  {{ cart_item_data.base_price[cart_item_data.item_qty] ? 
                            (cart_item_data.item_qty * (cart_item_data.base_price[cart_item_data.item_qty] / cart_item_data.item_qty )) : 
                            cart_item_data.item_qty * cart_item_data.base_price[1] }}</strong></small></p>
                </div>
            </div>
            
            <div v-if="cart_item_data.enhancements.length > 0" class="row">
                <div class="col-md-5">
                    <p class="text-left abw_cart_item_extras_label"><small>Extras</small></p>
                </div>
                <div class="col-md-7">
                    <p class="text-right abw_cart_item_extras_text"><small><strong>{{this.$store.getters.getCurrency}}  {{ enhancementsTotal }}</strong></small></p>
                </div>
            </div>
            <div class="row mgtb-1">
                <div class="col-md-7">
                    <p class="text-left abw_cart_item_subtotal_text" style="color: #ff573d;">
                        <strong>{{this.$store.getters.getCurrency}}  {{ subTotal }}</strong>
                    </p>
                </div>
                <div class="col-md-5 d-flex justify-content-end">
                    
                    <button class="abw_cart_item_details_btn" data-toggle="collapse" :data-target="'#collapse_'+cart_item_data.item_id" aria-expanded="false" aria-controls="collapseOne">
                       Details
                    </button>
                    &nbsp;
                    <button class="abw_cart_item_remove_btn" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
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
                        <div class="row">
                            <div class="col" style="background: #ffffff;">
                                <span style="background: #ffffff;font-size: 14px;text-align: left;"><strong>Extras</strong></span>
                            </div>
                        </div>
                        <div v-for="enhancement of cart_item_data.enhancements " :key="enhancement.id" class="row">
                            <div class="col" style="background: #ffffff;">
                                <p style="background: #ffffff;font-size: 12px;text-align: left;">
                                    {{enhancement.name}} x {{enhancement.qty}}</p>
                            </div>
                            <div class="col" style="background: #ffffff;">
                                <p style="background: #ffffff;font-size: 12px;text-align: right;">TZS {{enhancement.price}}</p>
                            </div>
                        </div>
                       
                    </div>
                </div>
                <!-- <h4><span class="text">Discount (30% Off)</span><span class="price">- TZS 6,500</span></h4> -->
                <div class="mgtb-1"><span class="text abw_cart_item_subtotal_text" style="color: #000000;">Sub Total:&nbsp;</span><span class="price" style="color: #ff573d;">TZS {{ subTotal }}</span></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "CartItemType3",
  props: {
    cart_item_data: Object,
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
        var itemBasePrice = 0;
      if (this.cart_item_data.base_price[this.cart_item_data.item_qty]) {
        itemBasePrice =
          this.cart_item_data.base_price[this.cart_item_data.item_qty] / this.cart_item_data.item_qty;
      } else {
        itemBasePrice = this.cart_item_data.base_price[1];
      }
      var qty_total =
        this.cart_item_data.item_qty *  itemBasePrice;
      var enhancement_total = this.enhancementsTotal;
      return qty_total + enhancement_total;
    },
  },
};
</script>
<style lang="">
</style>