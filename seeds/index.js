const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp'),

//const db = mongoose.connection;
mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() *20) +10;
        const camp = new Campground({
          //YOUR USER ID
            author: '6284a2aac02f30b56aaef2cb',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid necessitatibus doloribus perspiciatis magni iure cum optio modi hic non, placeat quos nemo totam deleniti. Soluta enim quos rem laudantium maiores?',
            price,
            geometry: { type: 'Point', 
            coordinates: [ 
                          cities[random1000].longitude, 
                          cities[random1000].latitude 
                        ] },
            images:   [
                    {
                      url: 'https://res.cloudinary.com/dwkmibftv/image/upload/v1653393797/YelpCamp/rfrsmspldort1wtkfbxj.jpg',
                      filename: 'YelpCamp/rfrsmspldort1wtkfbxj',
                    },
                    {
                      url: 'https://res.cloudinary.com/dwkmibftv/image/upload/v1653393799/YelpCamp/lwlda5gdrfre9nrnp3tw.jpg',
                      filename: 'YelpCamp/lwlda5gdrfre9nrnp3tw',
                    }
                  ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
