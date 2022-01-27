const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const wishlistController = require('../controllers/wishlist-controller');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router();

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 35 }),
  userController.registration,
);
router.post('/login', userController.login);
router.post('/auth/google', userController.googleAuth);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);
router.put(
  '/user',
  body(['name', 'bio', 'date', 'nickName']).isString(),
  authMiddleware,
  userController.updateUser,
);
router.put(
  '/user/userPic',
  body('userPic').isURL(),
  authMiddleware,
  userController.updateUserPic,
);
router.post('/sendResetMailPassword', userController.forgotPasswordMail);

router.post(
  '/login/extension',
  body('_id').isString(),
  userController.loginExtension,
);
router.post(
  '/addWishlist',
  body('name').isString(),
  authMiddleware,
  wishlistController.createWishlist,
);

router.delete(
  '/wishlist/:wishlistId',
  authMiddleware,
  wishlistController.deleteWishlist,
);

router.post(
  '/addUrl',
  body(['_id', 'nameURL', 'image', 'price']).isString(),
  body('url').isURL(),
  wishlistController.addUrl,
);
router.get('/wishlist/:wishlistId', wishlistController.getWishlist);
router.delete('/wish/:wishId', authMiddleware, wishlistController.deleteWish);
router.put(
  '/wish/:wishId',
  body('url').isURL(),
  body('nameURL').isString(),
  body('image').isString(),
  body('price').isString(),
  body('isReserved').isString(),
  body('gotIt').isBoolean(),
  authMiddleware,
  wishlistController.updateWish,
);

router.post('/archive', wishlistController.setItemToArchive);
router.put('/archive', wishlistController.deleteItemFromArchive);
router.get('/archive', wishlistController.getItemsFromArchive);
router.put('/restore', wishlistController.restoreItemsFromArchive);

router.get('/user/:userId', wishlistController.getWishlists);
router.get('/categories/:userId', wishlistController.getCategories);

module.exports = router;
