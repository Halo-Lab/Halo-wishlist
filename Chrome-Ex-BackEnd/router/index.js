const Router = require('express').Router;
const userController = require('../controllers/user-controller');
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
  '/addUrl',
  body('_id').isString(),
  body('url').isURL(),
  body('nameURL').isString(),
  userController.addUrl
);

module.exports = router;