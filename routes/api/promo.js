const router = require('express').Router();
const promotionController = require('../../controllers/promotionController');

// /api/promo

router
  .route('/')
  .get(promotionController.findAllPromos)
  .post(promotionController.create);

// /api/promo/redeem
router
  .route('/redeem')
  //To redeem, post body must contain the below format
  //{ PromotionId: <mongo promo _id>, UserId: <mongo user _id> }
  .get(promotionController.findAllRedemptions)
  .post(promotionController.redeemPromotion)
  .delete(promotionController.clearRedemptions);


router
  .route('/:id')
  .delete(promotionController.remove)
  .get(promotionController.findOnePromo);

router
  .route('/retrieve')
  .post(promotionController.findPromotionsByUser);

module.exports = router;