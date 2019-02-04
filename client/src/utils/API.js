import axios from "axios";

export default {
  getPromotions: function() {
    return axios.get("/api/promo")
  },
  getUsers: function() {
    return axios.get("/api/user")
  },
  getRedemptions: function() {
    return axios.get("api/promo/redeem")
  },
  savePromotion: function(promotion) {
    return axios.post("/api/promo", promotion);
  },
  saveUser: function(user) {
    return axios.post("/api/user", user);
  },
  getRedemptionCountByPromo: function() {
    return axios.get("api/metrics/redxpr");
  }
}