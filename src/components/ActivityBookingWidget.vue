<template>

<!-- <main class="page shopping-cart-page"> -->
  <!-- <section class="clean-block clean-cart dark"> -->
    <div class="container abw_container">
    
    <div>
      <div class="row">
        <div class="col-md-9 col-lg-9 " >
          <available-activities :co_id="this.act_co_id" :search_date="this.$store.getters.getSearchDate" :key="availableActivitiesComponentKey"></available-activities>         
        </div>
        <div class="col-md-3 col-lg-3 pdd0">
          <aside>
          <cart :key="cartComponentKey"></cart>
          </aside>
        </div>
      </div>
    </div>
  </div>
  <!-- </section> -->
<!-- </main> -->
  
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
</template>

<script>
import Cart from "../components/Cart.vue";
import AvailableActivities from '../components/AvailableActivities.vue';
// import * as bootstrap from './assets/bootstrap/js/bootstrap.min.js';


export default {
  name: "ActivityBookingWidget",
  props : {
      widget_co_id : Number
  },
  data(){
    return {
      act_co_id : 0,
      availableActivitiesComponentKey : 0,
      cartComponentKey : 1
    }
  },
  components: {
    Cart,
    AvailableActivities
  },
  beforeMount() {
      console.log(this.widget_co_id);

      if(document.getElementById('co_id')){
          this.act_co_id = document.getElementById('co_id').value;
      }else{
          this.act_co_id = 46;
      }
      
      var today = new Date();
      var date = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
      var date_str = date.toISOString().split('T')[0];
      this.searchbar_date = date_str;
      this.$store.subscribe((mutation, state) => {
        console.log(mutation.type)
        console.log(mutation.payload)
        console.log("Subscribtion : " , state.search_date)
        if(mutation.type == 'setSearchDate'){
          //Trigger Reloads
          this.$store.commit('clearCart');
          this.availableActivitiesComponentKey++;
          this.cartComponentKey++;

        }
        
      })

      if(this.$store.getters.getSearchDate != date_str){
              this.$store.commit('setSearchDate', date_str);
      }

  },
  computed:{
   
  }
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
@import url("../assets/css/smoothproducts.css");
@import url("../assets/bootstrap/css/bootstrap.min.css");





</style>
