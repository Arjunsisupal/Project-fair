// 1) import mongoose
const mongoose = require('mongoose')

//url used to connect with mongo db atlas
const connectionString = process.env.DATABASE_URL

// connect with mongo db
mongoose.connect(connectionString).then((res)=>{
    console.log('MongoDB Connected Successfully!!');
    
}).catch((err)=> {
    console.log(err);
    
})