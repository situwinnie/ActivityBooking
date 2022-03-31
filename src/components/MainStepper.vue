<template >
  <div>
    <div class="bs-stepper">
      <div class="bs-stepper-header" role="tablist">
        <!-- your steps here -->
        <div class="step" data-target="#logins-part">
          <button
            type="button"
            class="step-trigger"
            role="tab"
            aria-controls="logins-part"
            id="logins-part-trigger"
          >
            <span class="bs-stepper-circle">1</span>
            <span class="bs-stepper-label">Choose Activity</span>
          </button>
        </div>
        <div class="line"></div>
        <div class="step" data-target="#information-part">
          <button
            type="button"
            class="step-trigger"
            role="tab"
            aria-controls="information-part"
            id="information-part-trigger"
          >
            <span class="bs-stepper-circle">2</span>
            <span class="bs-stepper-label">Enter Your Information</span>
          </button>
        </div>
        <div class="line"></div>
        <div class="step" data-target="#payment-part">
          <button
            type="button"
            class="step-trigger"
            role="tab"
            aria-controls="payment-part"
            id="payment-part-trigger"
          >
            <span class="bs-stepper-circle">3</span>
            <span class="bs-stepper-label">Make Payment</span>
          </button>
        </div>
      </div>
      <div class="bs-stepper-content">
        <!-- your steps content here -->
        <div
          id="logins-part"
          class="content"
          role="tabpanel"
          aria-labelledby="logins-part-trigger"
        >
          <activity-booking-widget></activity-booking-widget>
        </div>
        <div
          id="information-part"
          class="content"
          role="tabpanel"
          aria-labelledby="information-part-trigger">
          <br><br>
          <div class="row">
            <div class="col-md-7">
              <checkout-info></checkout-info>
            </div>
            <div class="col-md-5">
              <checked-cart></checked-cart>
            </div>
            
          </div>
          
          
        </div>
        <div
          id="payment-part"
          class="content"
          role="tabpanel"
          aria-labelledby="payment-part-trigger"
        >
          <div v-if="loading_payment_page">
            <br /><br />
            <div class="row">
              <div class="col-md-12">
                <p>Preparing Your Payment</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="spinner-border text-danger" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          </div>
          <iframe
            :src="payment_link"
            id="payment_iframe"
            title="Activity Booking Widget"
            :key="payment_link_key"
            :onload="hideIframeLoader"
            frameBorder="0"
            style="width: 100%; height: 550px"
          >
          </iframe>

          <div class="row">
            <div class="col-md-5"></div>
            <div class="col-md-2">
              <button
                class="abw_act_checkout_back_btn"
                type="button"
                v-on:click="backToCart"
              >
                <strong>Back</strong>
              </button>
            </div>
            <div class="col-md-5"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ActivityBookingWidget from "./ActivityBookingWidget.vue";
import CheckoutInfo from "./CheckoutInfo.vue";
import Stepper from "bs-stepper";
import CheckedCart from './CheckedCart.vue';

export default {
  name: "MainStepper",
  components: { CheckoutInfo, ActivityBookingWidget ,  CheckedCart},
  data() {
    return {
      payment_link_key: 0,
      payment_iframe_key: 0,
      loading_payment_page: true,
    };
  },
  beforeMount() {
    this.$store.subscribe((mutation, state) => {
      console.log(mutation.type);
      console.log(mutation.payload);
      console.log("Checkout Event Subscription : ", state.search_date);
      var stepper = "";
      document.addEventListener("DOMContentLoaded", function () {
        stepper = new Stepper(document.querySelector(".bs-stepper"), {
          linear: true,
          animation: false,
          selectors: {
          steps: ".step",
          trigger: ".step-trigger",
          stepper: ".bs-stepper",
        },
        });
        stepper.to(1);
      });
       if(mutation.type == 'setSearchDate'){
          //Trigger Reloads
          this.$store.commit('clearCart');
          stepper = new Stepper(document.querySelector(".bs-stepper"));
          stepper.to(1);

        }
      if (mutation.type == "checkoutCart") {
        //Trigger Reloads
        stepper = new Stepper(document.querySelector(".bs-stepper"));
        stepper.to(2);
      } else if (mutation.type == "setPaymentLink") {
        //Trigger Reloads
        this.loading_payment_page = true;
        this.payment_link_key++;
        stepper = new Stepper(document.querySelector(".bs-stepper"));
        stepper.to(3);
      }
    });
  },
  mounted() {
    var stepper = "";
    document.addEventListener("DOMContentLoaded", function () {
      stepper = new Stepper(document.querySelector(".bs-stepper"), {
        linear: true,
        animation: false,
        selectors: {
          steps: ".step",
          trigger: ".step-trigger",
          stepper: ".bs-stepper",
        },
      });
      stepper.to(1);
    });
  },
  computed: {
    payment_link() {
      return this.$store.getters.getPaymentLink;
    },
    payment_iframe() {
      return this.$store.getters.getPaymentIframe;
    },
    iframe_style() {
      return 'background: url(\'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"width="100%" height="100%" viewBox="0 0 100% 100%"><text fill="%23FF0000" x="50%" y="50%" font-family="\'Lucida Grande\', sans-serif" font-size="24" text-anchor="middle">PLACEHOLDER</text></svg>\') 0px 0px no-repeat;';
    },
  },
  methods: {
    backToCart() {
      this.loading_payment_page = true;
      var stepper = new Stepper(document.querySelector(".bs-stepper"));
      stepper.to(2);
    },
    hideIframeLoader() {
      console.log("ONLOAD Complete detected");
      this.loading_payment_page = false;
    },
  },
};
</script>
<style>
.active .bs-stepper-circle{
  background-color: #eb699e !important;
}
</style>