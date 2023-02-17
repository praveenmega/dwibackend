const express = require('express');
const {postAuth} = require('../controllers/authController');

const router = express.Router();

router
    .route('/')
    .post(postAuth);

module.exports = router;