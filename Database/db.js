const  mongoose=require('mongoose')

require('dotenv').config()
const url=process.env.url

mongoose.connect(url,{autoIndex:true})
.then((result) => {
    console.log("Database Connected...");
}).catch((err) => {
    console.log(err);
});