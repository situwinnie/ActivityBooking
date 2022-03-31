
export default {

  data() {
    return {
      url: "https://activity.reserveport.com/ab_api"
    }
  },

  getActivitiesAvailableToday(company_id, date) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(
        {
          company_id: company_id,
          date: date
        }
      )
    };
    return fetch(this.data().url + "/public/index.php/api/check_all_activity_availability_on_date", requestOptions).then((res) => res.json());
  },

  addToCart(json_body) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(
        json_body
      )
    }   ;
    return fetch(this.data().url + "/public/index.php/api/add_to_cart", requestOptions)
      .then((response) => {
        // console.log(response.json());
        if (response.status != 200) {
          throw response.json();
        } else {
          return response.json();
        }
      });
  },

  checkoutCart(json_body) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(
        json_body
      )
    }   ;
    return fetch(this.data().url + "/public/index.php/api/book_cart", requestOptions)
      .then((response) => {
        // console.log(response.json());
        if (response.status != 200) {
          throw response.json();
        } else {
          return response.json();
        }
      });
  },

  removeFromCart(json_body) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(
        json_body
      )
    }   ;
    return fetch(this.data().url + "/public/index.php/api/remove_from_cart", requestOptions)
      .then((response) => {
        // console.log(response.json());
        if (response.status != 200) {
          throw response.json();
        } else {
          return response.json();
        }
      });
  }
}