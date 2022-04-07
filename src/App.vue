<template>
  <div class="container">
      <search-bar :searchbar_date="this.$store.getters.getSearchDate"></search-bar>
      <main-stepper></main-stepper>
      
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
@import '../public/assets/css/template.css';
@import url(https://use.fontawesome.com/e220fd8e50.css);

</style>
