<template lang="">
    <div class="abw_act_item_card">
        <div class="abw_act_item_card-body">
        
                    <div class=" justify-content-center align-items-center">
                        <div class="abw_act_item_details">
                                    <div class="row">
                                        <div class="col-4 abw_act_item_details_image">
                                          <figure>
                                            <img class="img-fluid d-block mx-auto image" :src=" (item_data.photos.length > 0) ? item_data.photos[0].file_location : '' ">
                                        </figure>
                                        <div class="row justify-content-center align-items-center Pbtn">
                        <div class="col" style="margin-top: 6px;">
                            <button class="abw_act_item_details_btn" type="button" data-toggle="modal" :data-target=" itemModalTarget ">More Details
                            </button>
                        </div><!--col-->
                        
                    
        </div>
                                        
                                        </div>
                                        <!--abw_act_item_details_image-->
                                        <div class="col-8 abw_act_item_details_desc text-left">
                                          <div class="product-name text-left abw_act_item_details_name">
                                        <h4 class="itemTitle">{{ item_data.name }}</h4>
                                         </div>
                                            <div class="itemDesc">{{ itemDescription }}</div>
                    
                                        <div class="extra"> 
                                             <div v-if="item_data.enhancements.length > 0" class="align-self-start">
                                               <span class="abw_act_item_extras_title product-name">Extras</span>
                            
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
                            <div><span class="value"></span></div>
                        </div>
                        

                                        </div><!--EXTRA-->

                                              <div class="priceAddBtn row">
                                        <div class="col-6"><span class="priceItem">{{ company_currency }} {{ currency(this.item_selected_total) }}</span></div>
                                         <div class="col-6">
                            <div v-if="item_adding_to_cart">
                                <div class="d-flex justify-content-center">
                                    <p>Adding Item..&nbsp;&nbsp;</p>
                                    <div class="spinner-border text-danger" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div><!--d-flex justify-content-center-->
                          </div><!--item_adding_to_cart-->
                            <div v-else>
                              <button class="abw_act_item_cart_btn" type="button" 
                                v-on:click="addActivityToCart">
                                   Add To Cart
                                </button>
                                <!--<button class="abw_act_item_cart_btn" type="button" 
                                v-on:click="addActivityToCart">
                                   Add To Cart {{ company_currency }} [ {{ currency(this.item_selected_total) }} ]
                                </button>-->
                            </div> <!--v-else-->
                        </div><!--col-->
                        </div><!--priceAddbtn-->
                                  </div>
                                        <!--abw_act_item_details_desc text-left-->
                                    </div>
                                <!-- <div >
                                    <div class="row" style="margin-top: 4px;margin-bottom: 4px;">
                                        <div class="col align-self-center">
                                            <div class="row">
                                                <div class="col-9 align-self-center" style="text-align: left;">
                                                    <p style="font-size: 14px;">Base Price - {{this.$store.getters.getCurrency}} &nbsp;&nbsp;<strong>{{ this.item_data.pricings[0].base_price[1] }}</strong></p>
                                                </div>
                                                <div class="col-3 text-center align-self-center">
                                                    <input class="form-control-sm form-control quantity-input" type="number" id="number-20" min="0" v-on:change="changeQty" v-model="adult_qty" style="text-align: center;font-size: 13px;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> -->
                        </div><!--bw_act_item_details-->
                        
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
                        <h4>Prices</h4>
                    </div>
                    <div class="m-4">
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Base Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            <td>
                                                <li>{{ (this.item_data.pricings[0].base_price == null ? 0 : currency(this.item_data.pricings[0].base_price[1])) }}</li>
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
import APIService from "../../services/api_service";
import numeral from "numeral";

export default {
  name: "ItemType1",
  props: {
    item_data: Object,
    company_currency: String,
  },
  data() {
    return {
      item_selected_total:
        this.item_data.pricings[0].base_price == null
          ? 0
          : this.item_data.pricings[0].base_price[1],
      item_has_error: false,
      item_adding_to_cart: false,
      item_error_message: "",
      adult_qty: 0,
      child_qty: 0,
      infant_qty: 0,
    };
  },
  computed: {
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
      var price =
        this.item_data.pricings[0].base_price == null
          ? 0
          : this.item_data.pricings[0].base_price[1];
      console.log(
        this.item_data.pricings[0].base_price == null
          ? 0
          : this.item_data.pricings[0].base_price[1]
      );

      return Math.round(price * 100 + Number.EPSILON) / 100;
    },
  },
  methods: {
    currency(value) {
      // console.log(value);
      return numeral(value).format("0,0.00");
    },
    changeQty() {
      var enhancements_total = 0;
      this.item_data.enhancements.forEach((element) => {
        var cost =
          element.base_price *
          document.getElementById("enhancement_" + element.id).value;
        enhancements_total = cost + enhancements_total;
      });

      this.item_selected_total =
        (this.item_data.pricings[0].base_price == null
          ? 0
          : this.item_data.pricings[0].base_price[1]) + enhancements_total;

      // if(this.item_selected_total == 0){
      //   this.no_item_selected = true;
      // }else{
      //   this.no_item_selected = false;
      // }
      // this.addToCartBtnKey++;
    },

    addActivityToCart() {
      this.item_adding_to_cart = true;
      this.item_has_error = false;
      console.log("Adding Activity To Cart...");

      var extras = [];
      this.item_data.enhancements.forEach((element) => {
        var enh_qty = document.getElementById("enhancement_" + element.id)
          .value;
        if (enh_qty > 0) {
          var enhancement = {
            id: element.id,
            qty: enh_qty,
          };
          extras.push(enhancement);
        }
      });

      var json_body = {};
      if (Object.keys(this.$store.getters.getCart).length == 0) {
        json_body = {
          item: {
            activity_id: this.item_data.id,
            date: this.$store.getters.getSearchDate,
            extras: extras,
          },
        };
      } else {
        json_body = {
          cart_id: this.$store.getters.getCart.cart_id,
          item: {
            activity_id: this.item_data.id,
            date: this.$store.getters.getSearchDate,
            extras: extras,
          },
        };
      }

      //   var today = new Date();

      //     var date = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
      //     var date_str = date.toISOString().split('T')[0];
      console.log(this.$store.getters.getSearchDate);
      APIService.addToCart(json_body)
        .then((json) => {
          // console.log("Then : ",json);
          // this.$store.state.setCart(json);
          this.$store.commit("setCart", json);

          this.item_adding_to_cart = false;
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
            this.item_adding_to_cart = false;
          }
        });
    },
  },
};
</script>
<style>
</style>