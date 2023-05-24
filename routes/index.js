const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controllers');

router.use('/users',require('./users'));
router.get('/',homeController.home);
router.use('/post',require('./post'));
router.use('/comments',require('./comments'));
router.use('/api',require('./api'));
router.use('/like',require('./likes'));
console.log('router load');
module.exports = router;