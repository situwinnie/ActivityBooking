<template lang="">
    <div class="abw_act_item_card">
        <div class="abw_act_item_card-body">
            <div class="items">
                <div class="product">
                    <div class="row justify-content-center align-items-center">
                        <div class="col abw_act_item_details">
                            <div>
                                <div class="col"><a class="product-name abw_act_item_details_name" href="#" style="margin-bottom: 0px;color: #000000;"><strong>{{ item_data.name }}</strong></a>
                                    <div class="row" style="margin: 0px;margin-top: 6px;margin-bottom: 6px;">
                                        <div class="col-4 abw_act_item_details_image"><img class="img-fluid d-block mx-auto image" :src=" (item_data.photos.length > 0) ? item_data.photos[0].file_location : '' "></div>
                                        <div class="col-8 text-left abw_act_item_details_desc"><span style="font-size: 13px; ">{{ itemDescription }}</span></div>
                                    </div>
                                </div>
                                <div v-for="pack of item_data.packages" :key="pack.id" class="row" style="margin-top: 4px;margin-bottom: 4px;">
                                    <div class="col align-self-center">
                                        <div class="row">
                                            <div class="col-12 align-self-center" style="text-align: left;">
                                                <div class="form-check text-left">
                                                    <input class="form-check-input" type="checkbox" :id="'ab_p_cb'+pack.id" v-on:change="changeQty">
                                                    <label class="form-check-label" :id="'ab_p'+pack.id" for="formCheck-9" style="font-size: 14px;">
                                                        {{ pack.name}} - {{this.$store.getters.getCurrency}} &nbsp;<strong>{{ currency(pack.pricings[0].base_price[1]) }}</strong>
                                                    </label></div>
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
                    <div :hidden="this.no_item_selected"  class="row justify-content-center align-items-center p-2">
                        <div v-if="item_data.enhancements.length > 0" class="align-self-start"><a class="abw_act_item_extras_title product-name" href="#" style="color: #000000;"><strong>Extras</strong></a><br><br>
                            <div>
                                <div v-for="enhancement of item_data.enhancements" :key="enhancement.id">
                                    <div class="row">
                                        <div class="col-7 abw_act_item_extra_name">
                                            <p style="font-size: 13px;">{{ enhancement.name }} -&nbsp;<strong>{{this.$store.getters.getCurrency}}  {{ currency(enhancement.base_price) }}</strong></p>
                                        </div>
                                        <div class="col-5 text-center align-self-center abw_act_item_extra_qty_input">
                                            <input class="form-control-sm form-control quantity-input" type="number" :id="'enhancement_'+enhancement.id" min="0" value="0" v-on:change="changeQty" style="text-align: center;font-size: 13px;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div><span class="value"></span></div>
                        </div>
                    </div>
                    <div class="row justify-content-center align-items-center">
                        <div class="col" style="margin-top: 6px;">
                            <button class="abw_act_item_details_btn" type="button" data-toggle="modal" :data-target=" itemModalTarget "><strong>More Details</strong>
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
                                    <strong style="font-size: 14px;">Add To Cart {{ company_currency }} [ {{ currency(this.item_selected_total)  }}]</strong>
                                </button>
                            </div>
                        </div>
                    </div>
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
                                            <th scope="col">Package Prices</th>
                                        </tr>
                                    </thead>
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
                                                <li>{{ pack.name}} - {{this.$store.getters.getCurrency}} &nbsp;<strong>{{ pack.pricings[0].base_price[1] }}</strong></li>
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
  name: "ItemType4",
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
  methods: {
    currency(value) {
      // console.log(value);
      return numeral(value).format("0,0.00");
    },
    changeQty() {
      var packages_total = 0;
      this.item_data.packages.forEach((element) => {
        if (document.getElementById("ab_p_cb" + element.id).checked) {
          packages_total = packages_total + element.pricings[0].base_price[1];
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
        var enh_qty = document.getElementById(
          "enhancement_" + element.id
        ).value;
        if (enh_qty > 0) {
          var enhancement = {
            id: element.id,
            qty: enh_qty,
          };
          extras.push(enhancement);
        }
      });

      var packages = [];
      this.item_data.packages.forEach((element) => {
           if (document.getElementById("ab_p_cb" + element.id).checked) {
                 var pack = {
                        id: element.id,
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
            packages: packages,
            extras: extras,
          },
        };
      } else {
        json_body = {
          cart_id: this.$store.getters.getCart.cart_id,
          item: {
            activity_id: this.item_data.id,
            date: this.$store.getters.getSearchDate,
            packages: packages,
            extras: extras,
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
<style lang="">
</style>