const express = require('express');
const { route } = require('./posts');
const router = express.Router();
router.use('/posts',require('./posts'));
router.use('/users',require('./users'));
module.exports = router;