var express = require('express');
var auth = require('../middleware/jwt');
const router = express.Router();


var categoriesController = require('../Controller/categoriesController');
var locationsController = require('../Controller/locationsController');
var notificationsController = require("../Controller/notificationsController");
var plansController = require('../Controller/plansController');
var servicesController = require('../Controller/servicesController')
var searchController = require('../Controller/searchController');
var userController = require('../Controller/userController');
// var loginController = require('../Controller/loginController');
var stateCityController = require('../Controller/indian_states_citiesController');
var signupController = require('../Controller/signupController');
var emailController = require('../Controller/emailController')





// router.get('/categories/getAll', auth.verifyToken, categoriesController.getCategoriesDataController);
router.route('/categories/getAll').get(categoriesController.getCategoriesDataController);
router.route('/categories/getAll/:_id').get(categoriesController.getCategoriesIdDataController);
router.route('/categories/getByName').post(categoriesController.getCategoriesNameDataController);
router.route('/categories/postAll').post(categoriesController.postCategoriesDataController);
router.route('/categories/updateAll/:_id').put(categoriesController.putCategoriesDataController);


router.route('/locations/getAll').get(locationsController.getLocationsDataController);
router.route('/locations/postAll').post(locationsController.postLocationsDataController);
router.route('/locations/updateAll/:locationId').put(locationsController.putLocationsDataController);

router.route('/notifications/getAll').get(notificationsController.getNotificationsDataController);
router.route('/notifications/postAll').post(notificationsController.postNotificationsDataController);
router.route('/notifications/updateAll/:searchBroadcastId').put(notificationsController.putNotificationsDataController);

router.route('/plans/getAll').get(plansController.getPlansDataController);
router.route('/plans/postAll').post(plansController.postPlansDataController);
router.route('/plans/updateAll/:planId').put(plansController.putPlansDataController);


router.route('/services/getALL').get(servicesController.getServicesDataController);
router.route('/services/sortBy').get(servicesController.serviceSort);
router.route('/services/getAll/:_id').get(servicesController.getServicesIdDataController);
router.route('/services/postAll').post(servicesController.postServicesDataController);
router.route('/services/updateAll/:_id').put(servicesController.putServicesDataController);

router.route('/search/getAll').get(searchController.getSearchDataController);
router.route('/search/postAll').post(searchController.postSearchDataController);
router.route('/search/updateAll/:locationId').put(searchController.putSearchDataController);

router.route('/users/getAll').get(userController.getUserDataController);
router.route('/users/postAll').post(userController.postUserDataController);
router.route('/users/updateAll/:userId').put(userController.putUserDataController);



router.route('/indian_states_cities/getAll').get(stateCityController.getStateCityDataController);

router.route('/signup/postAll').post(signupController.postSignupDatacontroller);

router.route('/email/postAll').post(emailController.postEmailDataController);

module.exports = router;