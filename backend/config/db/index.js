const mongoose = require("mongoose");
require("dotenv").config();

async function connect(){
    try {
        await mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.viqn0.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`);
        mongoose.Promise = global.Promise;
        console.log('connect successfully!!!');
    } catch (error) {
        console.log('connect fail!!!');
    }
    mongoose.Promise = global.Promise;
}
module.exports = {connect};