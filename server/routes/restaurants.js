const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError'); 
const { restaurantSchema } = require('../schemas.js');
const { protect } = require('../middleware/auth');
const { isAuthor } = require('../middleware/restaurant')
const restaurants = require('../controllers/restaurants');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


const validateRestaurant = (req, res, next) => {
    const { error } = restaurantSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else{next()}
};


router.get('/', catchAsync(restaurants.index))

router.get('/search', catchAsync(restaurants.showRestaurantsbySearch));

router.post('/new', upload.array('images'), validateRestaurant, protect, catchAsync(restaurants.createRestaurant))
 
 
router.get('/:id', catchAsync(restaurants.showRestaurant));

router.get('/geometry/:id', restaurants.getGeoData);


router.put('/:id/edit', protect, isAuthor, validateRestaurant,  catchAsync(restaurants.editRestaurant));

 
router.put('/:id/addphotos', upload.array('images'), protect, isAuthor, validateRestaurant,  catchAsync(restaurants.addPhotos));

 
 
 
 router.delete('/:id', protect, isAuthor, catchAsync(restaurants.deleteRestaurant));


 router.put('/:id/deletephotos', protect, isAuthor, catchAsync(restaurants.deletePhotos))
 

 module.exports = router;