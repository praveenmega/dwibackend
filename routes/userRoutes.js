const express = require('express');
const {postUser,getUsers,getCurrentUser} = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(getUsers)
    .post(postUser);

router
    .route('/me')
    .get(auth,getCurrentUser)

module.exports = router;