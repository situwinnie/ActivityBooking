<template>
      <div class="col-md-12">
        <div class="abw_cart_card">
          <div class="abw_cart_card-body">
            <div class="abw_cart_list">
              <h3>Checkout</h3>
              <hr />
              <div>
                
                <section class="clean-block clean-form dark">
                  <div class="container text-left">
                    <form>
                      <div class="form-group">
                        <label for="name">First Name</label
                        ><input
                          v-model="fname"
                          class="form-control"
                          type="text"
                          id="fname"
                          name="fname"
                        />
                      </div>
                      <div class="form-group">
                        <label for="subject">Last Name</label
                        ><input
                          v-model="lname"
                          class="form-control"
                          type="text"
                          id="lname"
                          name="subject"
                        />
                      </div>
                      <div class="form-group">
                        <label for="email">Email</label
                        ><input
                          v-model="email_address"
                          class="form-control"
                          type="email"
                          id="email"
                          name="email"
                        />
                      </div>
                      <div class="form-group">
                        <label for="email">Phone Number</label
                        ><input
                          v-model="phone_number"
                          class="form-control"
                          type="tel"
                          id="phone_number"
                          name="phone_number"
                        />
                      </div>
                      <div class="form-group">
                        <label for="message">Message</label
                        ><textarea
                          v-model="message"
                          class="form-control"
                          id="message"
                          name="message"
                        ></textarea>
                      </div>
                    </form>
                  </div>
                </section>
              </div>

              <!-- <h4>
                <div class="pt-3 row">
                  <div class="col-md-5">
                    <span class="text abw_cart_total_text"
                      ><strong>Cart Total</strong></span
                    >
                  </div>
                  <div class="col-md-7">
                    <span class="text-center abw_cart_total_amount"
                      ><p>
                        <strong>Tshs {{ cart_data.cart_total ?? 0 }}</strong>
                      </p></span
                    >
                  </div>
                </div>
              </h4> -->
              <div
                v-if="item_has_error"
                class="row justify-content-center align-items-center"
              >
                <div
                  class="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  <small
                    ><strong>Oops!</strong>&nbsp;
                    {{ item_error_message }}.</small
                  ><br>
                  <button
                    type="button"
                    class="btn btn-sm btn-primary "
                    v-on:click="clearCart"
                  >
                    <span aria-hidden="true">Refresh For a new cart</span>
                  </button>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
              <div class="row">
                <div class="col-md-5">
                  <button
                      class="abw_act_checkout_back_btn"
                      type="button"
                      v-on:click="backToCart"
                    >
                      <strong>Back</strong>
                    </button>
                </div>
                <div class="col-md-2">
                  
                </div>
                <div class="col-md-5">
                  <div v-if="is_checking_out">
                    <div class="d-flex justify-content-center">
                      <p>Checking Out...&nbsp;&nbsp;</p>
                      <div class="spinner-border text-danger" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <button
                      class="abw_act_item_cart_btn"
                      type="button"
                      v-on:click="checkoutCart"
                    >
                      <strong>Checkout</strong>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
import APIService from "../services/api_service";
import Stepper from "bs-stepper";

export default {
  components: {},
  name: "CheckoutInfo",
  props: {
    msg: String,
  },
  data() {
    return {
      fname: "",
      lname: "",
      email_address: "",
      message: "",
      phone_number: "",
      is_checking_out: false,
      item_has_error: false,
      item_error_message: "",
    };
  },
  computed: {
    cart_data() {
      console.log(this.$store.getters.getCart);
      var cart_data = this.$store.getters.getCart;
      return cart_data;
    },
  },
  methods: {
    backToCart(){ 
        var stepper = new Stepper(document.querySelector(".bs-stepper"));
        stepper.to(1);
    },
    clearCart(){ 
      this.$store.commit('clearCart');
      this.$router.push('/');
    },
    checkoutCart() {
      var json_body = {
        cart_id: this.$store.getters.getCart.cart_id,
        firstname: this.fname,
        lastname: this.lname,
        message : this.message,
        email_address: this.email_address,
        phone_number: this.phone_number,
      };

      //   var today = new Date();

      //     var date = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
      //     var date_str = date.toISOString().split('T')[0];
      console.log(this.$store.getters.getCart);
      this.is_checking_out = true;
      APIService.checkoutCart(json_body)
        .then((json) => {
          console.log("Then : ", json);
          // this.$store.state.setCart(json);
          // this.$store.commit("setCart", json);
          // window.open(json.payment_link, "_blank").focus();
          var temp = document.createElement("div");
          temp.innerHTML  = json.iframe;
          temp = temp.firstElementChild;
          var payment_link = temp.getAttribute("src")
          console.log(payment_link);
          this.$store.commit("setPaymentLink", payment_link);
          var stepper = new Stepper(document.querySelector(".bs-stepper"));
          stepper.to(3);
          // window.open(json.payment_link).focus();
          this.is_checking_out = false;
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
            this.is_checking_out = false;
          }
        });
    },
  },
};
</script>
<style>
.abw_cart_card {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.05rem;
}
.abw_cart_card-body {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1.25rem;
  /* background-color: #9af; */
}

.abw_cart_list {
  /* background-color: #33f; */
}

.abw_cart_total_text {
  color: #ff573d;
}

.abw_cart_total_amount {
  color: #ff573d;
}

.abw_act_checkout_back_btn{

}
</style>