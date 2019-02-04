const router = require('express').Router();
const promoRoutes = require("./promo");
const userRoutes = require("./user");
const metricRoutes = require('./metrics');

router.use('/promo', promoRoutes);
router.use('/user', userRoutes);
router.use('/metrics', metricRoutes);

module.exports = router;