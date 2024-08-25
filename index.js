const mongoose = require('mongoose'); 

const connectdb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB connected...');
    } catch(err){
       console.error('MangoDB connection error',err);
       throw err;
    }
}
module.exports = connectdb;