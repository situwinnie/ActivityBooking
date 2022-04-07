<template lang="">
    <div class="card transparent">
        <div class="card-header cart-summary" id="headingOne">
            <div class="row">
                <div class="col-md-12">
                    <p class="text-left abw_cart_item_name"><strong>{{ cart_item_data.item_name }}</strong></p>
                </div>
            </div>
            <div v-for="carted_package of cart_item_data.packages " :key="carted_package.id" class="col">
                <div class="row">
                    <div class="col-md-5" >
                        <p class="abw_cart_item_price_label" style="font-size: 14px;text-align: left;"><strong>{{ carted_package.name }}</strong></p>
                    </div>
                    <div class="col-md-7 abw_cart_item_base_price" >
                        <p style="font-size: 14px;text-align: left;"><strong>{{ getPackageCost(carted_package) }}</strong></p>
                    </div>
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
            <div class="row">
                <div class="col-md-5">
                    <p class="text-left abw_cart_item_subtotal_text" style="color: #ff573d;">
                        <strong>{{this.$store.getters.getCurrency}}  {{ subTotal }}</strong>
                    </p>
                </div>
                <div class="col-md-7 d-flex justify-content-end">
                    <button class="btn btn-outline-primary btn-sm abw_cart_item_details_btn" data-toggle="collapse" :data-target="'#collapse_'+cart_item_data.item_id" aria-expanded="false" aria-controls="collapseOne">
                        Details
                    </button>
                    &nbsp;
                    <button class="btn btn-outline-danger btn-sm abw_cart_item_remove_btn" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
        <div :id="'collapse_'+cart_item_data.item_id" class="collapse abw_cart_item_collapsed" aria-labelledby="headingOne" data-parent="#accordion">
            <div class="card-body">
                <h4><span class="text" style="color: #000000;">Packages</span></h4>
                <div v-for="carted_package of cart_item_data.packages " :key="carted_package.id" class="col" style="background: #ffffff;">
                    <div class="row">
                        <div class="col" style="background: #ffffff;">
                            <p style="background: #ffffff;font-size: 12px;text-align: left;"><strong>{{ carted_package.name }}</strong></p>
                        </div>
                    </div>
                    <div v-if="carted_package.item_adults > 0" class="row">
                        <div class="col" style="background: #ffffff;">
                            <p style="background: #ffffff;font-size: 12px;text-align: left;">
                                Adult x {{ carted_package.item_adults }}</p>
                        </div>
                        <div class="col" style="background: #ffffff;">
                            <p style="background: #ffffff;font-size: 12px;text-align: right;">
                                TZS {{carted_package.adult_price[carted_package.item_adults] ?
                                ( carted_package.item_adults * (carted_package.adult_price[carted_package.item_adults] / carted_package.item_adults )) :
                                carted_package.adult_price[1]}} Each</p>
                        </div>
                    </div>
                    <div v-if="carted_package.item_children > 0" class="row">
                        <div class="col" style="background: #ffffff;">
                            <p style="background: #ffffff;font-size: 14px;text-align: left;">
                                Children x {{ carted_package.item_children }}</p>
                        </div>
                        <div class="col" style="background: #ffffff;">
                            <p style="background: #ffffff;font-size: 14px;text-align: right;">
                                TZS {{carted_package.child_price[carted_package.item_children] ?
                                ( carted_package.item_children * (carted_package.child_price[carted_package.item_children] / carted_package.item_children )) :
                                carted_package.child_price[1]}} Each</p>
                        </div>
                    </div>
                    <div v-if="carted_package.item_infants > 0" class="row">
                        <div class="col" style="background: #ffffff;">
                            <p style="background: #ffffff;font-size: 14px;text-align: left;">
                                Infant x {{ carted_package.item_infants }}</p>
                        </div>
                        <div class="col" style="background: #ffffff;">
                            <p style="background: #ffffff;font-size: 14px;text-align: right;">
                                TZS {{carted_package.infant_price[carted_package.item_infants] ?
                                ( carted_package.item_infants * (carted_package.infant_price[carted_package.item_infants] / carted_package.item_infants )) :
                                carted_package.infant_price[1]}} Each</p>
                        </div>
                    </div>
                </div>
                <div v-if="cart_item_data.enhancements.length > 0" class="row">
                    <div class="col" style="background: #ffffff;">
                        <h4><span class="text" style="color: #000000;">Extras</span></h4>
                        <div class="row">
                            <div class="col" style="background: #ffffff;">
                 </div>
                        </div>
                        <div v-for="enhancement of cart_item_data.enhancements " :key="enhancement.id" class="row">
                            <div class="col" style="background: #ffffff;">
                                <p style="background: #ffffff;font-size: 14px;text-align: left;">
                                    {{enhancement.name}} x {{enhancement.qty}}</p>
                            </div>
                            <div class="col" style="background: #ffffff;">
                                <p style="background: #ffffff;font-size: 14px;text-align: right;">TZS {{enhancement.price}} Each</p>
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
  name: "CartItemType5",
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
    //   var adult_total =
    //     this.cart_item_data.item_adults * this.cart_item_data.adult_price[1];
    //   var child_total =
    //     this.cart_item_data.item_children * this.cart_item_data.child_price[1];
    //   var infant_total =
    //     this.cart_item_data.item_infants * this.cart_item_data.infant_price[1];
        var packages_total = 0;
        this.cart_item_data.packages.forEach((element)=>{
            packages_total = packages_total + this.getPackageCost(element);
        });


      var enhancement_total = this.enhancementsTotal;

      return packages_total + enhancement_total;
    },
  },
  methods: {
    getPackageCost(pack) {
      var adult_cost = 0;
      var child_cost = 0;
      var infant_cost = 0;

      if (pack.adult_price[pack.item_adults]) {
        adult_cost =
          pack.item_adults *
          (pack.adult_price[pack.item_adults] / pack.item_adults);
      } else {
        adult_cost = pack.item_adults * pack.adult_price[1];
      }

      if (pack.child_price[pack.item_children]) {
        child_cost =
          pack.item_children *
          (pack.child_price[pack.item_children] / pack.item_children);
      } else {
        child_cost = pack.item_children * pack.child_price[1];
      }

      if (pack.infant_price[pack.item_infants]) {
        infant_cost =
          pack.item_infants *
          (pack.infant_price[pack.item_infants] / pack.item_infants);
      } else {
        infant_cost = pack.item_infants * pack.infant_price[1];
      }
      return adult_cost + child_cost + infant_cost;
    },
  },
};
</script>
<style lang="">
</style>