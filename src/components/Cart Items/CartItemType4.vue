<template lang="">
    <div class="card">
        <div class="card-header" id="headingOne">
            <div class="row">
                <div class="col-md-12">
                    <p class="text-left abw_cart_item_name"><strong >{{ cart_item_data.item_name }}</strong></p>
                    </div>
            </div>
           <div v-for="pack of cart_item_data.packages" :key="pack.id" class="row" style="margin-top: 4px;margin-bottom: 4px;">
                        <div class="col-md-8">
                            <p class="text-left abw_cart_item_price_label"><small>{{ pack.name}} </small></p>
                        </div>
                        <div class="col-md-4">
                            <p class="text-right abw_cart_item_base_price">
                                <small v-for="(price , index) of pack.price" :key="price">
                                            <td v-if="index == 1">
                                                <strong>{{this.$store.getters.getCurrency}}  {{ price }}</strong>
                                            </td>
                                </small>
                                <!-- <small>
                                <strong>{{this.$store.getters.getCurrency}}  {{ pack.price[1] }}</strong>
                                </small> -->
                            </p>
                        </div>
                        
            </div>
          
            
            <div v-if="cart_item_data.enhancements.length > 0" class="row">
                <div class="col-md-8">
                    <p class="text-left abw_cart_item_extras_label"><small>Extras</small></p>
                </div>
                <div class="col-md-4">
                    <p class="text-right abw_cart_item_extras_text"><small><strong>{{this.$store.getters.getCurrency}}  {{ enhancementsTotal }}</strong></small></p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <p class="text-left abw_cart_item_subtotal_text" style="color: #ff573d;">
                        <strong>{{this.$store.getters.getCurrency}}  {{ subTotal }}</strong>
                    </p>
                </div>
                <div class="col-md-8 d-flex justify-content-end">
                    
                    <button class="btn btn-outline-primary btn-sm abw_cart_item_details_btn" data-toggle="collapse" :data-target="'#collapse_'+cart_item_data.item_id" aria-expanded="false" aria-controls="collapseOne">
                       <small> Details </small>
                    </button>
                    &nbsp;
                    <button class="btn btn-outline-danger btn-sm abw_cart_item_remove_btn" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                       <small> Remove </small>
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
                                <p style="background: #ffffff;font-size: 14px;text-align: left;"><strong>Extras</strong></p>
                            </div>
                        </div>
                        <div v-for="enhancement of cart_item_data.enhancements " :key="enhancement.id" class="row">
                            <div class="col" style="background: #ffffff;">
                                <p style="background: #ffffff;font-size: 14px;text-align: left;">
                                    {{enhancement.name}} x {{enhancement.qty}}</p>
                            </div>
                            <div class="col" style="background: #ffffff;">
                                <p style="background: #ffffff;font-size: 14px;text-align: right;">TZS {{enhancement.price}}</p>
                            </div>
                        </div>
                       
                    </div>
                </div>
                <!-- <h4><span class="text">Discount (30% Off)</span><span class="price">- TZS 6,500</span></h4> -->
                <h4><span class="text abw_cart_item_subtotal_text" style="color: #000000;">Sub Total:&nbsp;</span><span class="price" style="color: #ff573d;">TZS {{ subTotal }}</span></h4>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "CartItemType4",
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
      var enhancement_total = this.enhancementsTotal;
      var subTotal = enhancement_total;
      this.cart_item_data.packages.forEach((element) => {
        subTotal = subTotal + element.price[1];
      });

      return subTotal;
    },
  },
};
</script>
<style lang="">
</style>