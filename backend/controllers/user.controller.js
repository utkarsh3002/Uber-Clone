const userModel=require('../models/user.model.js')
const {validationResult}=require('express-validator')
const userService=require('../services/user.service.js')

const registerUser=async (req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {fullname,email,password}=req.body
    const hashpassword=await userModel.hashPassword(password)
    const user=await userService.createUser({
        firstname:fullname.firstname,lastname:fullname.lastname,email:email,password:hashpassword
    })

    const token= user.generateAuthToken()
    console.log(user)
    console.log(token)

    res.status(201).json({token,user})
}

module.exports={registerUser}