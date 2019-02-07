const models = require('../models');

module.exports =  {
  findAllPromos: function(req, res) {
    console.log("Finding all promotions");
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
    console.log("Finding one promotion");
    models.Promotion
      .findOne({_id: req.params.id})
      .then(dbPromo => res.json(dbPromo))
      .catch(err => res.status(422).json(err));
  },
  redeemPromotion: function(req, res) {
    console.log("creating new redemption", req.body);
    models.Redemption
      .create(req.body)
      .then(dbRedeem => {
        return models.User.findOneAndUpdate({ _id: dbRedeem.UserId}, {$push : { CouponsRedeemed: dbRedeem.PromotionId }}, { new: true });
      })
      .then(dbUser => {
        console.log(dbUser);
        res.status(202).json(dbUser)
      })
      .catch(err => res.status(422).json(err));
  },
  findAllRedemptions: function(req,res) {
    models.Redemption
      .find()
      .then(dbRedeem => {
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
  },

  findPromotionsByUser: function(req, res) {
    models.User
        .findOne({_id: req.body.UserId})
        .populate('CouponsRedeemed')
        .then(dbUser => {
          const CouponsRedeemed = dbUser.CouponsRedeemed;
            return (
              models.Promotion
                .find({
                  _id : {$nin: CouponsRedeemed},
                  BeaconTag : {$in: req.body.BeaconTag},
                  PreferenceGroup : dbUser.PreferenceGroup
                })
                .then(filteredPromos => {
                  res.json(filteredPromos)
                })
            )
        })
  }
};