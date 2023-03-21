const Restaurant = require('../models/restaurants');
const { cloudinary } = require('../cloudinary');
const multer = require('multer');
const { authorize } = require('passport');


const mapBoxToken = process.env.MAPBOX_TOKEN;
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });










module.exports.index = async (req, res)=> {
    const restaurants = await Restaurant.find({});
    res.send(restaurants)
    };

module.exports.createRestaurant = async (req, res, next)=> { 
    const geoData = await geocoder.forwardGeocode({
        query: req.body.location,
        limit: 1
    }).send();
    const restaurant = new Restaurant({...req.body});
    restaurant.geometry = geoData.body.features[0].geometry
    restaurant.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    // restaurant.images = {url: req.file.path, filename: req.file.filename}
    restaurant.author = req.user._id;
    await restaurant.save();
    res.send(restaurant);
   };

module.exports.showRestaurant = async (req, res) => {
    
    const restaurant = await Restaurant.findById(req.params.id).populate({
       path: 'reviews',
       populate: {
           path: 'author'
       }
    }).populate('author');
    res.send(restaurant)
    };

 module.exports.getGeoData = async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    res.send(restaurant.geometry)
 }   

module.exports.editRestaurant = async (req,res)=> {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, {...req.body});
    // if(req.files) {
    // const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    // hotel.images.push(...imgs);
    // };
    // console.log(JSON.stringify(req.body));  
    const geoData = await geocoder.forwardGeocode({
        query: req.body.location,
        limit: 1
    }).send(); 
    restaurant.geometry = geoData.body.features[0].geometry
    await restaurant.save();
    res.send(restaurant);
    };

    module.exports.showRestaurantsbySearch = async (req, res, next) => {
        const { searchQuery } = req.query;
       
    
        try {
            const searchedLocation = new RegExp(searchQuery, "i");
            const restaurants = await Restaurant.find({location: searchedLocation});
            res.json(restaurants);
            
        } catch (error) {
            next (error)
        }
    
    };

module.exports.addPhotos = async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    if(req.files) {
        const imgs = req.files.map(f => ({ url: f.path, filename: f.filename}));
        restaurant.images.push(...imgs)
    }
    // console.log(JSON.stringify(req.body));   
    await restaurant.save();
    res.send(restaurant)
 }    

module.exports.deletePhotos = async (req, res) => {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    for(let filename of req.body.deleteImages) {
        await cloudinary.uploader.destroy(filename)
    };
    await restaurant.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}})
    // console.log(req.body.deleteImages);
    res.send('Ok, It worked!!!')
}    

module.exports.deleteRestaurant = async (req,res)=> {
    const restaurant = await Restaurant.findById(req.params.id);
    for(let image of restaurant.images) {
        await cloudinary.uploader.destroy(image.filename)
    }
    await Restaurant.findByIdAndDelete(req.params.id);
    res.send('Cool, you deleted me!')
    };
