const mongoose=require('mongoose')

function connectToDb(){
    mongoose.connect(process.env.MongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(()=>{
        console.log("database connected")
    }).catch(err=>console.log(err))
}

module.exports=connectToDb

