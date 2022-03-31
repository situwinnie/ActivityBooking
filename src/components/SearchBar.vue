<template>
  <div class="row">
    <div class="col"></div>
    <div class="col text-center">
      <label class="text-center">Select Date</label>
      <form>
        <div class="form-group">
          <input
            class="form-control"
            type="date"
            id="ab_searchbar"
            :min='this.min_search_date'
            :value="this.searchbar_date"
            v-on:change="searchdateChanged"
          />
        </div>
      </form>
    </div>
    <div class="col"></div>
  </div>
</template>


<script>
export default {
  name: "SearchBar",
  data(){
   return {
     min_search_date : ""
   };
  },
  props: {
    searchbar_date: String,
  
  },
  beforeMount() {
      var today = new Date();
      var date = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
      var date_str = date.toISOString().split('T')[0];
      this.min_search_date = date_str;
      

  },

  methods:{
    searchdateChanged(){
      console.log("Date Changed");
      var date_text = document.getElementById("ab_searchbar").value;
      this.$store.commit('setSearchDate', date_text);
      // console.log( this.searchbar_date);
      console.log(this.$store.getters.getSearchDate);
    }
  }
  
};
</script>



<style scoped>
</style>