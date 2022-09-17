const Hotel = require('../models/hotels');
const { cloudinary } = require('../cloudinary');
const multer = require('multer');




module.exports.index = async (req, res)=> {
    const hotels = await Hotel.find({});
    res.send(hotels)
    };

module.exports.createHotel = async (req, res, next)=> { 
    const hotel = await new Hotel({...req.body});
    hotel.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    // hotel.images = {url: req.file.path, filename: req.file.filename}
    hotel.author = req.user._id;
    await hotel.save();
    res.send(hotel);
   };

module.exports.showHotel = async (req, res) => {
    const hotel = await Hotel.findById(req.params.id).populate({
       path: 'reviews',
       populate: {
           path: 'author'
       }
    }).populate('author');
    res.send(hotel)
    };

module.exports.editHotel = async (req,res)=> {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, {...req.body});
    // if(req.files) {
    // const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    // hotel.images.push(...imgs);
    // };
    // console.log(JSON.stringify(req.body));   
    await hotel.save();
    res.send(hotel);
    };

module.exports.addPhotos = async (req, res) => {
    const hotel = await Hotel.findById(req.params.id);
    if(req.files) {
        const imgs = req.files.map(f => ({ url: f.path, filename: f.filename}));
        hotel.images.push(...imgs)
    }
    console.log(JSON.stringify(req.body));   
    await hotel.save();
    res.send(hotel)
 }    

module.exports.deletePhotos = async (req, res) => {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);
    for(let filename of req.body.deleteImages) {
        await cloudinary.uploader.destroy(filename)
    };
    await hotel.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}})
    console.log(req.body.deleteImages);
    res.send('Ok, It worked!!!')
}    

module.exports.deleteHotel = async (req,res)=> {
    const hotel = await Hotel.findById(req.params.id);
    for(let image of hotel.images) {
        await cloudinary.uploader.destroy(image.filename)
    }
    await Hotel.findByIdAndDelete(req.params.id);
    res.send('Cool, you deleted me!')
    };