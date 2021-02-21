const mongoose = require('mongoose');
const {SERVER}=require('../config/environment')
//CONNECTING TO MONGODB
mongoose.connect(`${SERVER.DATABASE_URL}/${SERVER.DATABASE_NAME}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
}).then(()=>{
    console.log("===>DATABASE CONNECTED SUCCESFULLY.")
}).catch(()=>{
    console.log("UNABLE TO CONNECT TO DATABASE.");
})

module.exports={
    mongoose
}

