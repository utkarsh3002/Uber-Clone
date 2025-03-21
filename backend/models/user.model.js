const mongoose =require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const userSchema=mongoose.Schema(
    {
        fullname:{
            firstname:{
                type:String,
                required:true,
                minlength:[3,'First Name should be atleast 3 characters']
            },
            lastname:{
                type:String,
                minlength:[3,'Last Name should be atleast 3 characters']
            }

        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            select:false  //to prevent password from going while finding user
        },
        socketid:{
           type:String
        }
    }
)

// Methods(functions) of userSchema
//this - represent current user
userSchema.methods.generateAuthToken=function(){
    const token = jwt.sign({_id:this._id},process.env.JWTSecret)
    return token
}

userSchema.methods.comparePassword=async function(password){
       return await bcrypt.compare(password,this.password)
}
//static method
userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10)
}

const userModel=mongoose.model('user',userSchema) //For example, if you pass 'user' as the model name, Mongoose will create a 
// collection called users in the MongoDB database (pluralizing the name).

module.exports=userModel;
