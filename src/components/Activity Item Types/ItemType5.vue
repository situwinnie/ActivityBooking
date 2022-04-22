<template lang="">
    <div class="abw_act_item_card">
        <div class="abw_act_item_card-body">
            <div class="items">
                <div class="product">
                    <div class="row justify-content-center align-items-center">
                        <div class="abw_act_item_details">
                            
                              
                                    <div class="row" style="margin: 0px;margin-top: 6px;margin-bottom: 6px;">
                                        <div class="col-4 abw_act_item_details_image">
                                            <figure>
                                            <img class="img-fluid d-block mx-auto image" :src=" (item_data.photos.length > 0) ? item_data.photos[0].file_location : '' ">
                                        </figure>
                                        <div class="row justify-content-center align-items-center Pbtn">
                                            <div class="col" style="margin-top: 6px;">
                                                <button class="abw_act_item_details_btn" type="button" data-toggle="modal" :data-target=" itemModalTarget ">More Details
                                                </button>
                                            </div>
                                            <div class="col" style="margin-top: 6px;">
                                                <div v-if="item_adding_to_cart">
                                                    <div class="d-flex justify-content-center">
                                                        <p>Adding Item..&nbsp;&nbsp;</p>
                                                        <div class="spinner-border text-danger" role="status">
                                                            <span class="sr-only">Loading...</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-else>
                                                    <button class="abw_act_item_cart_btn" type="button" v-on:click="addActivityToCart"
                                                    :key="addToCartBtnKey"
                                                    :disabled="no_item_selected">
                                                       Add To Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        </div>
                                        <div class="col-8 text-left abw_act_item_details_desc">
                                            <div class="product-name abw_act_item_details_name"><h4 class="itemTitle">{{ item_data.name }}</h4></div>
                                            <div class="itemDesc">{{ itemDescription }}</div>
                                            <span class="priceItem">{{ company_currency }}  {{ currency(this.item_selected_total)  }}</span>
                                            <div class="collapse-list">
                                            <div v-for="pack of item_data.packages" :key="pack.id" class="card">
                                                <div class="card-header text-left" id="headingOne">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" :id="'ab_t5_p_cb'+pack.id" v-on:change="changeQty">
                                                        <label class="form-check-label " for="formCheck-6" style="font-size: 14px;"><strong>{{ pack.name }}</strong></label>
                                                        
                                                    </div>
                                                </div>
                                                
                                                <div :id="'ab_t5_p_coll'+pack.id" class="collapse" aria-labelledby="headingOne" >
                                                    <div class="card-body">
                                                        <div class="row" style="margin-top: 4px;margin-bottom: 4px;">
                                                            <div class="col align-self-center">
                                                                <div class="row">
                                                                    <div class="col-8">
                                                                        <p style="font-size: 13px;text-align: left;">Adults - {{this.$store.getters.getCurrency}}  <strong>{{ currency(pack.pricings[0].adult_price[1]) }}</strong></p>
                                                                    </div>
                                                                    <div class="col-3 offset-md-1 text-center align-self-center">
                                                                        <input class="form-control-sm form-control quantity-input"  v-on:change="changeQty"
                                                                        type="number" :id="'ab_t5_p_cb_adult'+pack.id" min = "0" value="0" style="text-align: center;font-size: 13px;"></div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-8">
                                                                        <p style="font-size: 13px;text-align: left;">Children - {{this.$store.getters.getCurrency}}  <strong>{{ currency(pack.pricings[0].child_price[1]) }}</strong></p>
                                                                    </div>
                                                                    <div class="col-3 offset-md-1 text-center align-self-center">
                                                                        <input class="form-control-sm form-control quantity-input"  v-on:change="changeQty"
                                                                        type="number" :id="'ab_t5_p_cb_child'+pack.id" min = "0" value="0" style="text-align: center;font-size: 13px;"></div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-8 align-self-center" style="text-align: left;">
                                                                        <p style="font-size: 13px;text-align: left;">Infants - {{this.$store.getters.getCurrency}}  <strong>{{ currency(pack.pricings[0].infant_price[1]) }}</strong></p>
                                                                    </div>
                                                                    <div class="col-3 offset-md-1 text-center align-self-center">
                                                                        <input class="form-control-sm form-control quantity-input"  v-on:change="changeQty"
                                                                        type="number" :id="'ab_t5_p_cb_infant'+pack.id" min = "0" value="0" style="text-align: center;font-size: 13px;"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
 
                                            <div :hidden="this.no_item_selected"  class="justify-content-center align-items-center">
                                                <div class="extra">
                                                <div v-if="item_data.enhancements.length > 0" class="align-self-start"><span class="abw_act_item_extras_title product-name">Extras</span>
                                                    <div>
                                                        <div v-for="enhancement of item_data.enhancements" :key="enhancement.id">
                                                            <div class="row">
                                                                <div class="col-8 abw_act_item_extra_name">
                                                                    <p style="font-size: 13px;">{{ enhancement.name }} -&nbsp;<strong>{{this.$store.getters.getCurrency}}  {{ currency(enhancement.base_price) }}</strong></p>
                                                                </div>
                                                                <div class="col-3 offset-md-1 text-center align-self-center abw_act_item_extra_qty_input">
                                                                    <input class="form-control-sm form-control quantity-input" type="number" :id="'enhancement_'+enhancement.id" min="0" value="0" v-on:change="changeQty" style="text-align: center;font-size: 13px;">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div><span class="value"></span></div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                  
                        </div>
                        
                    </div>
                    <div v-if="item_has_error" class="row justify-content-center align-items-center">
                        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                            <small><strong>Oops!</strong>&nbsp; {{ item_error_message }}.</small>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    </div>



    <!-- Modal -->
    <div class="modal fade" :id=" itemModalID " tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ item_data.name }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" style="overflow-y: auto; max-height: 640px">
                    <div class="row">
                        <div class="col-md-12">
                            <div :id="'carousel'+item_data.id" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    <div v-for="(photo,index) of item_data.photos" :key="photo.id" :class="'carousel-item '+ (index == 0 ? 'active': '')">
                                        <img class="img-fluid d-block mx-auto image w-100" :src=" (photo.file_location.length > 0) ? photo.file_location : '' ">
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" :data-target="'#carousel'+item_data.id" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" :data-target="'#carousel'+item_data.id" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="m-4">
                        {{ item_data.desc }}
                    </div>
                    <div class="m-4">
                        <h4>Package Prices</h4>
                    </div>
                    <div class="m-4">
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table">
                                    <!-- <thead>
                                        <tr>
                                            <th scope="col">Package Prices</th>
                                        </tr>
                                    </thead> -->
                                    <tbody>
                                        <!-- <div v-for="pack of item_data.packages" :key="pack.id" class="row" style="margin-top: 4px;margin-bottom: 4px;">
                                            <div class="col align-self-center">
                                                <div class="row">
                                                    <div class="col-12 align-self-center" style="text-align: left;">
                                                        <div class="form-check text-left">
                                                            <input class="form-check-input" type="checkbox" :id="'ab_p_cb'+pack.id" v-on:change="changeQty">
                                                            <label class="form-check-label" :id="'ab_p'+pack.id" for="formCheck-9" style="font-size: 14px;">
                                                                {{ pack.name}} - {{this.$store.getters.getCurrency}} &nbsp;<strong>{{ pack.pricings[0].base_price[1] }}</strong>
                                                            </label></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> -->
                                        <tr v-for="pack of item_data.packages" :key="pack.id">
                                            
                                            <td>
                                              <table class="table">
                                                <tbody>
                                                  <tr><td colspan="3"><strong>{{ pack.name}}</strong></td></tr>
                                                  <tr>
                                                    <td>
                                                      <li v-for="(pricing,index) of pack.pricings[0].adult_price" :key="index">
                                                        <small>{{ index }} - Adults&nbsp;<strong> Tshs. {{ pricing }}</strong></small>
                                                        </li>
                                                    </td>
                                                    <td>
                                                        <li v-for="(pricing,index) of pack.pricings[0].child_price" :key="index">
                                                          <small>{{ index }} - Children&nbsp;<strong> Tshs. {{ pricing }}</strong></small></li>
                                                    </td>
                                                    <td>
                                                        <li v-for="(pricing,index) of pack.pricings[0].infant_price" :key="index">
                                                          <small>{{ index }} - Infants&nbsp;<strong> Tshs. {{ pricing }}</strong></small>
                                                          </li>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                            
                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <!-- <button type="button" class="btn btn-secondary" >Close</button> -->
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import $ from "jquery";
import APIService from "../../services/api_service";
import numeral from "numeral";


export default {
  name: "ItemType5",
  props: {
    item_data: Object,
    company_currency: String
  },
  data() {
    return {
      item_selected_total: 0,
      item_has_error: false,
      item_adding_to_cart: false,
      item_error_message: "",
      adult_qty: 0,
      child_qty: 0,
      infant_qty: 0,
      no_item_selected: true,
      addToCartBtnKey : 0
    };
  },
  methods: {
    currency(value) {
      // console.log(value);
      return numeral(value).format("0,0.00");
    },
    changeQty() {
      
    var packages_total = 0;
      this.item_data.packages.forEach((element) => {
        if (document.getElementById("ab_t5_p_cb" + element.id).checked) {
            
          packages_total = packages_total + (element.pricings[0].adult_price[1] * document.getElementById('ab_t5_p_cb_adult'+element.id).value);
          packages_total = packages_total + element.pricings[0].child_price[1]  * document.getElementById('ab_t5_p_cb_child'+element.id).value;
          packages_total = packages_total + element.pricings[0].infant_price[1]  * document.getElementById('ab_t5_p_cb_infant'+element.id).value;

          $("#ab_t5_p_coll"+ element.id).collapse('show');
        }else {
          $("#ab_t5_p_coll"+ element.id).collapse("hide");
        }
      });

      var enhancements_total = 0;
      this.item_data.enhancements.forEach((element) => {
        var cost =
          element.base_price *
          document.getElementById("enhancement_" + element.id).value;
        enhancements_total = cost + enhancements_total;
      });

      this.item_selected_total = packages_total + enhancements_total;

      if(packages_total == 0){
        this.no_item_selected = true;
      }else{
        this.no_item_selected = false;
      }
      this.addToCartBtnKey++;


    },
    addActivityToCart() {
      this.item_adding_to_cart = true;
      this.item_has_error = false;
      console.log("Adding Activity To Cart...");

      var extras = [];
      this.item_data.enhancements.forEach((element) => {
        var enh_qty = document.getElementById("enhancement_" + element.id).value;
        if(enh_qty > 0){
          var enhancement = {
            id : element.id ,
            qty : enh_qty
          }
          extras.push(enhancement);
        }
      });

      var packages = [];
      this.item_data.packages.forEach((element) => {
           if (document.getElementById("ab_t5_p_cb" + element.id).checked) {
                var infant_qty = parseInt(document.getElementById('ab_t5_p_cb_infant' + element.id).value);
                var child_qty = parseInt(document.getElementById('ab_t5_p_cb_child' + element.id).value);
                var adult_qty = parseInt(document.getElementById('ab_t5_p_cb_adult' + element.id).value);


                 var pack = {
                        id: element.id,
                        adults:adult_qty,
                        children:child_qty,
                        infants:infant_qty
                    };
                    packages.push(pack);
            }
        
        
      });

      var json_body = {};
      if (Object.keys(this.$store.getters.getCart).length == 0) {
        json_body = {
          item: {
            activity_id: this.item_data.id,
            date: this.$store.getters.getSearchDate,
            extras: extras,
            packages :packages,
          },
        };
      } else {
        json_body = {
          cart_id: this.$store.getters.getCart.cart_id,
          item: {
            activity_id: this.item_data.id,
            date: this.$store.getters.getSearchDate,
            extras: extras,
            packages :packages,
          },
        };
      }

      //   var today = new Date();

      //     var date = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
      //     var date_str = date.toISOString().split('T')[0];
      console.log(this.$store.getters.getCart);
      APIService.addToCart(json_body)
        .then((json) => {
          // console.log("Then : ",json);
          // this.$store.state.setCart(json);
          this.$store.commit('setCart', json)

          this.item_adding_to_cart = false;

        })
        .catch((err) => {
          console.log(err);
          return err;
        })
        .then((err_data) => {
          if(err_data != undefined){
            console.log(err_data.message);
            this.item_error_message = err_data.message;
            this.item_has_error = true;
            this.item_adding_to_cart = false;
          }
          
        });
    },
  },
  computed: {
    getPackagesTotal() {
      var packages_total = 0;
      this.item_data.packages.forEach((element) => {
        console.log(
          "Element by ID : " +
            document.getElementById("ab_p_cb" + element.id).checked
        );

        if (document.getElementById("ab_p_cb" + element.id).checked) {
          console.log("ab_p_cb" + element.id);
          packages_total = packages_total + element.pricings[0].base_price[1];
        }
      });
      return packages_total;
    },

    // a computed getter
    itemDescription() {
      // `this` points to the component instance

      if (this.item_data.desc == null) {
        return "";
      }

      if (this.item_data.desc.length > 180) {
        return this.item_data.desc.slice(0, 180) + "...";
      } else {
        return this.item_data.desc;
      }
    },

    itemModalID() {
      // `this` points to the component instance

      return "m" + this.item_data.id + "Modal";
    },
    itemModalTarget() {
      // `this` points to the component instance

      return "#m" + this.item_data.id + "Modal";
    },

    itemBasePrice() {
      var price = this.item_data.pricings[0].base_price[1];
      console.log(this.item_data.pricings[0].base_price[1]);

      return Math.round(price * 100 + Number.EPSILON) / 100;
    },
  },
};
</script>
<style lang="">
</style>