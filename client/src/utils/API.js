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
  },
  getPromotionCountByPreferenceGroup: function() {
    return axios.get("api/metrics/prxprg");
  },
  getRedemptionCountByUser: function() {
    return axios.get("api/metrics/redxusr")
  },
  getUserCountByPreferenceGroup: function() {
    return axios.get("api/metrics/usrxprg")
  },
  getUsersByCreateDate: function() {
    return axios.get("api/metrics/usrxdate")
  }
}