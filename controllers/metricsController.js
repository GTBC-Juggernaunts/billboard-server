const models = require('../models');

module.exports =  {
  getRedemptionCountByPromo: function(req, res) {
    models.Redemption
      .aggregate([
        {"$group" : {_id:"$PromotionId", count:{$sum:1}}}
      ])
      .sort({count: -1})
      .then(dbMetric => {
        console.log(dbMetric);
        res.json(dbMetric)
      })
      .catch(err => res.status(422).json(err))
  },

  getPromotionsByPreferenceGrp: function(req, res) {
    models.Promotion
      .aggregate([
        {"$group" : {_id: "$PreferenceGroup", count:{$sum:1}}}
      ])
      .sort({count: -1})
      .then(dbMetric => {
        console.log(dbMetric);
        res.json(dbMetric)
      })
      .catch(err => res.status(422).json(err))
  },

  getRedemptionCountByUser: function(req, res) {
    models.Redemption
      .aggregate([
        {"$group" : {_id:"$UserId", count:{$sum:1}}}
      ])
      .sort({count: -1})
      .then(dbMetric => {
        console.log(dbMetric);
        res.json(dbMetric)
      })
      .catch(err => res.status(422).json(err))
  },

  getUsersByPreferenceGrp: function(req, res) {
    models.User
      .aggregate([
        {"$group" : {_id: "$PreferenceGroup", count:{$sum:1}}}
      ])
      .sort({count: -1})
      .then(dbMetric => {
        console.log(dbMetric);
        res.json(dbMetric)
      })
      .catch(err => res.status(422).json(err))
  }
};