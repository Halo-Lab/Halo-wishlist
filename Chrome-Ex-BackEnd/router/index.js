const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const wishlistController = require('../controllers/wishlist-controller');
const {body} = require('express-validator');

const router = new Router();

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({min: 3, max: 35}),
  userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);

router.post(
  '/login/extension',
  body('_id').isString(),
  userController.loginExtension
);
router.post(
  '/addWishlist',
  body('userId').isString(),
  body('name').isString(),
  wishlistController.createWishlist
);
router.post(
  '/addUrl',
  body('_id').isString(),
  body('url').isURL(),
  body('nameURL').isString(),
  wishlistController.addUrl
);
router.get('/wishlist/:wishlistId', wishlistController.getWishlist);
router.get('/user/:userId', wishlistController.getWishlists);
router.get('/categories/:userId', wishlistController.getCategories);

module.exports = router;
