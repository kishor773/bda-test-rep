var express = require('express');
var auth = require('../middleware/jwt');
const router = express.Router();
const upload = require("../helpers/upload");

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
var imageUploader = require('../Controller/imageUploader')

//! CATEGORY COLLECTIONS API's
// router.get('/categories/getAll', auth.verifyToken, categoriesController.getCategoriesDataController);
router.route('/categories/getAll').get(categoriesController.getCategoriesDataController);
router.post('/categories/postAll', auth.verifyToken, categoriesController.postCategoriesDataController);
//  router.route('/categories/postAll').post(categoriesController.postCategoriesDataController);
router.put('/categories/updateAll/:_id', auth.verifyToken, categoriesController.putCategoriesDataController);
//  router.route('/categories/updateAll/:_id').put(categoriesController.putCategoriesDataController);
router.get('/categories/getAll/:_id', auth.verifyToken, categoriesController.getCategoriesIdDataController);
//  router.route('/categories/getAll/:_id').get(categoriesController.getCategoriesIdDataController);
router.post('/categories/getByName', auth.verifyToken, categoriesController.getCategoriesNameDataController);
// router.route('/categories/getByName').post(categoriesController.getCategoriesNameDataController);

//! LOCATIONS COllECTIONS API's
//  router.get('/locations/getAll',auth.verifyToken,locationsController.getLocationsDataController)
router.route('/locations/getAll').get(locationsController.getLocationsDataController);
router.post('/locations/postAll', auth.verifyToken, locationsController.postLocationsDataController)
// router.route('/locations/postAll').post(locationsController.postLocationsDataController);
router.put('/locations/updateAll/:_id', auth.verifyToken, locationsController.putLocationsDataController);
// router.route('/locations/updateAll/:_id').put(locationsController.putLocationsDataController);

//! NOTIFICATIONS COLLECTIONS API's
router.get('/notifications/getAll', auth.verifyToken, notificationsController.getNotificationsDataController);
// router.route('/notifications/getAll').get(notificationsController.getNotificationsDataController);
router.post('/notifications/postAll', auth.verifyToken, notificationsController.postNotificationsDataController)
// router.route('/notifications/postAll').post(notificationsController.postNotificationsDataController);
router.put('/notifications/updateAll/:_id', auth.verifyToken, notificationsController.putNotificationsDataController)
// router.route('/notifications/updateAll/:_id').put(notificationsController.putNotificationsDataController);

//! PLANS COLLECTIONS API's
router.get('/plans/getAll', auth.verifyToken, plansController.getPlansDataController);
// router.route('/plans/getAll').get(plansController.getPlansDataController);
router.post('/plans/postAll', auth.verifyToken, plansController.postPlansDataController);
// router.route('/plans/postAll').post(plansController.postPlansDataController);
router.put('/plans/updateAll/:_id', auth.verifyToken, plansController.putPlansDataController)
// router.route('/plans/updateAll/:_id').put(plansController.putPlansDataController);

//! SERVICES COLLECTION API's
router.get('/services/getALL', auth.verifyToken, servicesController.getServicesDataController)
// router.route('/services/getALL').get(servicesController.getServicesDataController);
router.post('/services/postAll', auth.verifyToken, servicesController.postServicesDataController)
// router.route('/services/postAll').post(servicesController.postServicesDataController);
router.put('/services/updateAll/:_id', auth.verifyToken, servicesController.putServicesDataController)
// router.route('/services/updateAll/:_id').put(servicesController.putServicesDataController);
router.put('/services/updateAll/serviceDetails/:_id', auth.verifyToken, servicesController.putServicesByServiceDetailsIdDataController)
// router.route('/services/updateAll/:_id').put(servicesController.putServicesDataServiceIDController);
router.get('/services/getAll/:_id', auth.verifyToken, servicesController.getServicesIdDataController);
// router.route('/services/getAll/:_id').get(servicesController.getServicesIdDataController);
router.get('/services/getAll/serviceDetails/:_id', auth.verifyToken, servicesController.getServicesByServiceDetailsIdDataController);
// router.route('/services/getAll/:_id').get(servicesController.getServicesByServiceDetailsIdDataController);
router.get('/services/sortBy', auth.verifyToken, servicesController.serviceSort);
// router.route('/services/sortBy').get(servicesController.serviceSort);
router.get('/services/getByCategoryName/:name', auth.verifyToken, servicesController.getServicesByCategoryName)
// router.route('/services/getByCategoryName/:name').get(servicesController.getServicesByCategoryName)
router.post('/services/filterServices', auth.verifyToken, servicesController.filterSerBasedOnCatController)

//! SEARCH COLLECTION API's
router.get('/search/getAll', auth.verifyToken, searchController.getSearchDataController)
// router.route('/search/getAll').get(searchController.getSearchDataController);
router.post('/search/postAll', auth.verifyToken, searchController.postSearchDataController);
// router.route('/search/postAll').post(searchController.postSearchDataController);
router.put('/search/updateAll/:_id', auth.verifyToken, searchController.putSearchDataController);
// router.route('/search/updateAll/:_id').put(searchController.putSearchDataController);
router.get('/search/email/:email', auth.verifyToken, searchController.getSearchEmailDataController);
// router.route('/search/email/:email').get(searchController.getSearchEmailDataController);


//! USERS COLLECTION API's
router.get('/users/getAll', auth.verifyToken, userController.getUserDataController);
// router.route('/users/getAll').get(userController.getUserDataController);
router.post('/users/postAll', auth.verifyToken, userController.postUserDataController);
// router.route('/users/postAll').post(userController.postUserDataController);
router.put('/users/updateAll/:userId', auth.verifyToken, userController.putUserDataController)
// router.route('/users/updateAll/:userId').put(userController.putUserDataController);

//! INDIAN-STATE-CITY COLLECTION APIS'S
// router.get('/indian_states_cities/getAll', auth.verifyToken, stateCityController.getStateCityDataController);
router.route('/indian_states_cities/getAll').get(stateCityController.getStateCityDataController);
router.route('/signup/postAll').post(signupController.postSignupDatacontroller);
router.route('/email/postAll').post(emailController.postEmailDataController);

//! FILE UPLOAD ROUTES BELOW
router.post("/image/upload", auth.verifyToken, upload.array("files", 5), imageUploader.uploadImages);

module.exports = router;