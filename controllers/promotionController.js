const models = require('../models');

module.exports =  {
  findAllPromos: function(req, res) {
    models.Promotion
      .find()
      .sort({ExpirationDate: -1})
      .then(dbPromo => {
        console.log(dbPromo);
        res.json(dbPromo)
      })
      .catch(err => res.status(422).json(err))
  },
  findOnePromo: function(req, res) {
    models.Promotion
      .findOne(req.query)
      .then(dbPromo => res.json(dbPromo))
      .catch(err => res.status(422).json(err));
  },
  redeemPromotion: function(req, res) {
    models.Redemption
      .create(req.body)
      .then(()=> {
        models.User.findOneAndUpdate({ _id: req.body.UserId}, {$push : { CouponsRedeemed: req.body.PromotionId }}, { new: true })
      })
      .then(dbRedeem => {
        res.status(202).json(dbRedeem)
      })
      .catch(err => res.status(422).json(err));
  },
  findAllRedemptions: function(req,res) {
    models.Redemption
      .find()
      .then(dbRedeem => {
        console.log(dbRedeem);
        res.json(dbRedeem)
      })
      .catch(err => res.status(422).json(err))
  },
  create: function(req, res) {
    models.Promotion
      .create(req.body)
      .then(dbPromo => res.json(dbPromo))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    models.Promotion
      .findById({ _id: req.params.id })
      .then(dbPromo => dbPromo.remove())
      .then(dbPromo => res.json(dbPromo))
      .catch(err => res.status(422).json(err));
  }
};