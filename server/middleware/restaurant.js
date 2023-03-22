const Restaurant = require('../models/restaurants');
const ExpressError = require('../utils/ExpressError');
const { authorize } = require('passport');


module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant.author.equals(req.user._id)) {
        return next(new ExpressError('Not authorized to access this route', 401));
    }
    next();
}