<template>
  <div class="container">
      <search-bar :searchbar_date="this.$store.getters.getSearchDate"></search-bar>
      <main-stepper></main-stepper>
      <br>
      <hr>
      <br><br>
    </div>
  
</template>

<script>

import MainStepper from './components/MainStepper.vue';
import SearchBar from "./components/SearchBar.vue";

export default {
  name: "App",
  data(){
    return {};
  },
  components: {
    MainStepper,
    SearchBar
  },
  
};
</script>

<style>


.abw_container{

}

.abw_available_act_card {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: .05rem
}
.abw_available_act_card-body {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1.25rem;
    background-color: #fff2fa;
}

.abw_available_act_header_text{
    /* background-color: #3af; */
}

.abw_available_act_list{
    /* background-color: #33f; */
}


.abw_act_item_card {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #FFF;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.05rem;
}
.abw_act_item_card-body {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1.25rem;
  /* background-color: #9af; */
}

.abw_act_item_details {
  /* background-color: #9af; */
}

.abw_act_item_details_name {
  /* background-color: #9af; */
}

.abw_act_item_details_image {
  /* background-color: #9af; */
}

.abw_act_item_details_desc {
  /* background-color: #9af; */
}

.abw_act_item_extras_title {
  /* background-color: #9af; */
}

.abw_act_item_extra_name {
  /* background-color: #9af; */
}

.abw_act_item_extra_qty_input {
  /* background-color: #9af; */
}

.abw_act_item_details_btn {
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  display: block;
  width: 100%;
}
.abw_act_item_details_btn:hover {
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #fff;
    background-color: #0069d9;
    border-color: #0062cc;
  display: block;
  width: 100%;
}


.abw_act_item_cart_btn {
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #fff;
  background-color: #ff573d;
  display: block;
  width: 100%;
}
.abw_act_item_cart_btn:hover {
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.95rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #fff;
  background-color: #ff573d;
  display: block;
  width: 100%;
}

.abw_act_item_cart_btn:disabled {
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.95rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #fff;
  background-color: #ff573d;
  /* filter: contrast(80%); */
  opacity:0.5;
  display: block;
  width: 100%;
}

.abw_act_checkout_back_btn {
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #fff;
  background-color: #0069d9;
  display: block;
  width: 100%;
}
.abw_act_checkout_back_btn:hover {
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.95rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #fff;
    background-color: #0069d9;
    border-color: #0062cc;
  display: block;
  width: 100%;
}

.abw_cart_item_card {
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
.abw_cart_item_card-body {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1.25rem;
  /* background-color: #9af; */
}

.abw_cart_item_name{

}

.abw_cart_item_price_label{

}

.abw_cart_item_base_price{

}

.abw_cart_item_extras_label{

}

.abw_cart_item_extras_text{
    
}

.abw_cart_item_subtotal_text{
    color: #000000;
}

.abw_cart_item_remove_btn {
    color: #ff573d;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    border-color: #ff573d;
    padding: .25rem .5rem;
    font-size: .875rem;
    line-height: 1.5;
    border-radius: .2rem;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out
}

.abw_cart_item_details_btn {
    display: inline-block;
    font-weight: 400;
    color: #007bff;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    border-color: #007bff;
    padding: .25rem .5rem;
    font-size: .875rem;
    line-height: 1.5;
    border-radius: .2rem;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out
}

.abw_cart_item_collapsed{

}

.abw_cart_item_subtotal_text{

}


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
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: .05rem
}
.abw_cart_card-body {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1.25rem;
    background-color: #fff2fa;
}

.abw_cart_list{
    /* background-color: #33f; */
}

.abw_cart_total_text{
  color: #ff573d;
}

.abw_cart_checkout_btn{
  background-color: #ff573d !important;
}

.abw_cart_total_amount{
  color: #ff573d;
}




</style>
