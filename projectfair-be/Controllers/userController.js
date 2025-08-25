const {findOneAndUpdate} = require('../Models/userSchema')
const users = require('../Models/userSchema')
const jwt= require('jsonwebtoken')
// user registration
exports.registerUser = async (req,res)=>{

    // here we write logic to receive the request
    // extract data send from FE in user request
    // 1) find whether email id is already registered
    // 2) if it is already registered send response back to FE
    // 3) if not found, insert that data into DB
     console.log('Inside register user controller');
     console.log(req.body);
     const {name,email,password} = req.body;

     try{
        // check whether user already registered using email
     const existingUser=await users.findOne({email:email})
     if (existingUser){
        res.status(409).json('Account already exists,Please Login!!')
     }
     else{
        // insert that user into DB
        console.log('User not found')
        const newUser = new users({
            name:name,
            email:email,
            password:password,
            github:"",
            linkedin:"",
            profile:""
        })
        await newUser.save()
        res.status(201).json(`${name} Registered Successfully`)
     }
     }
     catch (err){
        res.status(201).json('Register request failed due to',err)
     }
   
    
}

// user login 
   exports.loginUser =async (req,res)=>{
    // here we write logic for login
    const {email,password} = req.body
    console.log('Inside login controller function',email,password);
   try{
      const existingUser = await users.findOne({email:email,password:password});
      if (existingUser){
         const token = jwt.sign({userId:existingUser._id},'supersecretkey')
         console.log('Token:", token')
         
        res.status(200).json({
         user_data:existingUser,
         jwt_token:token
        })
         
      }
      else{
         res.status(406).json("Login failed due to invalid Email or Password")
         
      }

   }
   catch(err){
      res.status(401).json('Login failed due to:',err)
   }
    
}