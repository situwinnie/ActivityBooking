<template lang="">
    <div class="abw_available_act_card">
                <div class="abw_available_act_card-body">
                    <h5 :key="availableActComponentKey" class="abw_available_act_header_text">Available Activities On {{ formatted_date }}</h5>
                   
                    <div v-if="loading_activities">
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="abw_available_act_list">

                            
                                <div v-for="activity of activities" :key="activity.id">
                                    <div class="activityList" v-if="activity.type == 1">
                                        <ItemType1 :company_currency="currency" :item_data = activity />
                                        &nbsp;
                                    </div>
                                    <div class="activityList" v-else-if="activity.type === 2">
                                        <ItemType2 :company_currency="currency" :item_data = activity />
                                        &nbsp;
                                    </div>
                                    <div class="activityList" v-else-if="activity.type === 3">
                                        <ItemType3 :company_currency="currency" :item_data = activity />
                                        &nbsp;
                                    </div>
                                    <div class="activityList" v-else-if="activity.type === 4">
                                        <ItemType4 :company_currency="currency" :item_data = activity />
                                        &nbsp;
                                    </div>
                                    <div class="activityList" v-else-if="activity.type === 5">
                                        <ItemType5 :company_currency="currency" :item_data = activity />
                                        &nbsp;
                                    </div>
                                    <div class="activityList" v-else-if="activity.type === 6">
                                        <ItemType6 :company_currency="currency" :item_data = activity />
                                        &nbsp;
                                    </div>
                                    <div class="activityList" v-else-if="activity.type === 7">
                                        <ItemType7 :company_currency="currency" :item_data = activity />
                                        &nbsp;
                                    </div>
                                    <div class="activityList" v-else-if="activity.type === 8">
                                        <ItemType8 :company_currency="currency" :item_data = activity />
                                        &nbsp;
                                    </div>
                                    <div class="activityList" v-else-if="activity.type === 9">
                                        <ItemType9 :company_currency="currency" :item_data = activity />
                                        &nbsp;
                                    </div>
                                    <div v-else>
                                    </div>
                                </div>
                        </div>
                    </div>
                    
              </div>
            </div>
</template>
<script>
import ItemType1 from "./Activity Item Types/ItemType1.vue";
import ItemType2 from "./Activity Item Types/ItemType2.vue";
import ItemType3 from "./Activity Item Types/ItemType3.vue";
import ItemType4 from "./Activity Item Types/ItemType4.vue";
import ItemType5 from "./Activity Item Types/ItemType5.vue";
import ItemType6 from "./Activity Item Types/ItemType6.vue";
import ItemType7 from "./Activity Item Types/ItemType7.vue";
import ItemType8 from "./Activity Item Types/ItemType8.vue";
import ItemType9 from "./Activity Item Types/ItemType9.vue";
import APIService from "../services/api_service";
import dayjs from 'dayjs';
import AdvancedFormat from 'dayjs/plugin/advancedFormat'

export default {
  name: "AvailableActivities",
  props: {
    co_id: Number,
    search_date: String,
  },
  components: {
    ItemType1,
    ItemType2,
    ItemType3,
    ItemType4,
    ItemType5,
    ItemType6,
    ItemType7,
    ItemType8,
    ItemType9,
  },
  data() {
    return {
      loading_activities: true,
      search_date_string : "Today",
      availableActComponentKey : 1 ,
      currency : "",
      activities: [],
    };
  },
  computed: {
      formatted_date(){
          dayjs.extend(AdvancedFormat);
          return dayjs(this.search_date).format('MMM Do, YYYY');
      }
  },
  methods: {},
  beforeMount() {
      this.$store.subscribe((mutation, state) => {
        console.log(mutation.type)
        console.log(mutation.payload)
        console.log("Subscribtion : " , state.search_date)
        if(mutation.type == 'setSearchDate'){
          //Trigger Reloads
          this.search_date_string = "On "+ state.search_date;
          this.availableActComponentKey++;

        }
      });
  },
  mounted() {
    // methods can be called in lifecycle hooks, or other methods!
    console.log("Fetching Activities Today...");
    APIService.getActivitiesAvailableToday(this.co_id, this.search_date)
      .then((json) => {
        console.log(json);
        this.activities = json.response;
        this.loading_activities = false;
        // this.company_currency = this.activities[0].company.foreign_currencies[0].code;
        // console.log( this.activities[0]);

        this.activities.forEach(element => {
            // console.log(element);
            if(element.message !== "Activity Unavailable"){
                
                this.currency = element.company.foreign_currencies[0].code;
                console.log(this.currency);
                this.$store.commit('setCurrency', this.currency);
                //  console.log( element.company.foreign_currencies[0].code );
                //  break;
            }
        });

        return this.activities;
      })
      .catch((err) => console.log(err.message));
  },
};
</script>
<style >
</style>