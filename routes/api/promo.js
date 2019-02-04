const router = require('express').Router();
const promotionController = require('../../controllers/promotionController');

// /api/promo
router
  .route('/?tag')
  .get(promotionController.findOnePromo);

router
  .route('/')
  .get(promotionController.findAllPromos)
  .post(promotionController.create);

router
  .route('/:id')
  .delete(promotionController.remove);

// /api/promo/redeem

router
  .route('/redeem')
  //To redeem, post body must contain the below format
  //{ PromotionId: <mongo promo _id>, UserId: <mongo user _id> }
  .post(promotionController.redeemPromotion)
  .get(promotionController.findAllRedemptions);

module.exports = router;