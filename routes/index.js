const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controllers');

router.get('/',homeController.home);
console.log('router load');
module.exports = router;