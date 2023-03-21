const Restaurant = require('../models/restaurants');
const Review = require('../models/reviews');
const { authorize } = require('passport');


module.exports.createReview = async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    const review = await new Review({...req.body});
    review.author = req.user._id;
    await restaurant.reviews.push(review);
    restaurant.populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
     });
    await restaurant.save();
    review.populate('author');
    await review.save();
    res.send(review);
    };

module.exports.showReview = async (req, res) => {
    const {reviewId} = req.params;
    const review = await Review.findById(reviewId).populate('author');
    res.send(review)
   }; 
   
module.exports.deleteReview = async (req, res) => {
    const {id, reviewId} = req.params;
    const restaurant = await Restaurant.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);   
    res.send(restaurant);
  };   