const express = require('express');
const { signup, signin, getUsers, getUser, createUser, deleteUser, updateUser, fblogin } = require('../controllers/c_users');
const { authentication, authorisation,  authorisation_admin, autherror } = require('../middlewares/auth')

const router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
// });


router
  .get('/', authentication, authorisation_admin, autherror, getUsers)       // GET all users (admin role only)
  .get('/profile', authentication, authorisation, autherror, getUser)       // GET specific user based on id (admin role only or related user)
  .post('/signup', signup)                                                  // POST new user (register)
  .post('/signin', signin)                                                  // POST log in registered user
  .post('/fblogin', fblogin)
  .post('/', authentication, authorisation_admin, autherror, createUser)    // POST create new user (admin role only)
  .delete('/delete', authentication, authorisation, autherror, deleteUser)  // DELETE specific user based on id (admin role only or related user)
  .put('/update', authentication, authorisation, autherror, updateUser)     // PUT specific user based on id (admin role only or related user)


module.exports = router;
  