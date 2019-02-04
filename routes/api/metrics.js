const router = require('express').Router();
const metricsController = require('../../controllers/metricsController');

// /api/metrics

router
  // get count of redemptions by promotion id
  .route('/redxpr')
  .get(metricsController.getRedemptionCountByPromo);

router
  // get count of promotions by category
  .route('/prxprg')
  .get(metricsController.getPromotionsByPreferenceGrp);

router
  // get count of redemptions by user id
  .route('/redxusr')
  .get(metricsController.getRedemptionCountByUser);

router
  //get count of users by preference group
  .route('/usrxprg')
  .get(metricsController.getUsersByPreferenceGrp);

module.exports = router;