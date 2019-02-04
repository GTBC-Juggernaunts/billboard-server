const models = require('../models');

module.exports =  {
  getRedemptionCountByPromo: function(req, res) {
    models.Redemption
      .aggregate([
        {"$group" : {_id:"$PromotionId", count:{$sum:1}}}
      ])
      .then(dbMetric => {
        console.log(dbMetric);
        res.json(dbMetric)
      })
      .catch(err => res.status(422).json(err))
  },
};