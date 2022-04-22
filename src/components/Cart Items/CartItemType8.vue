<template lang="">
    <div class="card transparent">
        <div class="card-header cart-summary" id="headingOne">
            <div class="row">
                <div class="col-md-12">
                    <p class="text-left abw_cart_item_name"><strong>{{ cart_item_data.item_name }}</strong></p>
                </div>
            </div>
            <div v-for="carted_session of cart_item_data.sessions " :key="carted_session.id" class="col">
                <div class="row">
                    <div class="col-md-5" >
                        <p class="abw_cart_item_price_label" style="font-size: 14px;text-align: left;"><strong>{{ carted_session.name }}</strong></p>
                    </div>
                    <div class="col-md-7 " >
                        <p class="abw_cart_item_base_price" style="font-size: 14px;text-align: left;"><strong>{{ getSessionsCost(carted_session) }}</strong></p>
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
                <h4><span class="text" style="color: #000000;">Sessions</span></h4>
                <div v-for="carted_session of cart_item_data.sessions " :key="carted_session.id" class="col" style="background: #ffffff;">
                    <div class="row">
                        <div class="col" style="background: #ffffff;">
                            <p style="background: #ffffff;font-size: 14px;text-align: left;"><strong>{{ carted_session.name }}</strong></p>
                        </div>
                    </div>
                    <div v-if="carted_session.item_adults > 0" class="row">
                        <div class="col" style="background: #ffffff;">
                            <p style="background: #ffffff;font-size: 14px;text-align: left;">
                                Adult x {{ carted_session.item_adults }}</p>
                        </div>
                        <div class="col" style="background: #ffffff;">
                            <p style="background: #ffffff;font-size: 14px;text-align: right;">
                                TZS {{carted_session.adult_price[carted_session.item_adults] ?
                                ( carted_session.item_adults * (carted_session.adult_price[carted_session.item_adults] / carted_session.item_adults )) :
                                carted_session.adult_price[1]}} Each</p>
                        </div>
                    </div>
                    <div v-if="carted_session.item_children > 0" class="row">
                        <div class="col" style="background: #ffffff;">
                            <p style="background: #ffffff;font-size: 14px;text-align: left;">
                                Children x {{ carted_session.item_children }}</p>
                        </div>
                        <div class="col" style="background: #ffffff;">
                            <p style="background: #ffffff;font-size: 14px;text-align: right;">
                                TZS {{carted_session.child_price[carted_session.item_children] ?
                                ( carted_session.item_children * (carted_session.child_price[carted_session.item_children] / carted_session.item_children )) :
                                carted_session.child_price[1]}} Each</p>
                        </div>
                    </div>
                    <div v-if="carted_session.item_infants > 0" class="row">
                        <div class="col" style="background: #ffffff;">
                            <p style="background: #ffffff;font-size: 14px;text-align: left;">
                                Infant x {{ carted_session.item_infants }}</p>
                        </div>
                        <div class="col" style="background: #ffffff;">
                            <p style="background: #ffffff;font-size: 14px;text-align: right;">
                                TZS {{carted_session.infant_price[carted_session.item_infants] ?
                                ( carted_session.item_infants * (carted_session.infant_price[carted_session.item_infants] / carted_session.item_infants )) :
                                carted_session.infant_price[1]}} Each</p>
                        </div>
                    </div>
                </div>
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
                                <p style="background: #ffffff;font-size: 12px;text-align: left;">
                                    {{enhancement.name}} x {{enhancement.qty}}</p>
                            </div>
                            <div class="col" style="background: #ffffff;">
                                <p style="background: #ffffff;font-size: 12px;text-align: right;">TZS {{enhancement.price}} Each</p>
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
  name: "CartItemType8",
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
        var sessions_total = 0;
        this.cart_item_data.sessions.forEach((element)=>{
            sessions_total = sessions_total + this.getSessionsCost(element);
        });


      var enhancement_total = this.enhancementsTotal;

      return sessions_total + enhancement_total;
    },
  },
  methods: {
    getSessionsCost(sess) {
      var adult_cost = 0;
      var child_cost = 0;
      var infant_cost = 0;

      if (sess.adult_price[sess.item_adults]) {
        adult_cost =
          sess.item_adults *
          (sess.adult_price[sess.item_adults] / sess.item_adults);
      } else {
        adult_cost = sess.item_adults * sess.adult_price[1];
      }

      if (sess.child_price[sess.item_children]) {
        child_cost =
          sess.item_children *
          (sess.child_price[sess.item_children] / sess.item_children);
      } else {
        child_cost = sess.item_children * sess.child_price[1];
      }

      if (sess.infant_price[sess.item_infants]) {
        infant_cost =
          sess.item_infants *
          (sess.infant_price[sess.item_infants] / sess.item_infants);
      } else {
        infant_cost = sess.item_infants * sess.infant_price[1];
      }
      return adult_cost + child_cost + infant_cost;
    },
  },
};
</script>
<style lang="">
</style>