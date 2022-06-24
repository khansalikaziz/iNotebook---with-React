const express = require('express');
const User = require('../models/User');
const router = express.Router(); 
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fethuser');

const JWT_SECRET='Salikisagoodb$boy'

//Route 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser',[
    body('email','Enter a valid email').isEmail(),
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
], async(req, res)=>{ 
    let success=false;
    //If there are errors ,return bad requiest and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() }); 
    }
    //check whether the user with same email exists already
   try{
   let user=await User.findOne({email:req.body.email});
   
   if(user){
    return res.status(400).json({success,error:'Sorry a user with this email already exists'});
   }
   //Hashing password
   const salt =await bcrypt.genSalt(10);
   const secPass=await bcrypt.hash(req.body.password,salt);
   //create a new user
   user=await User.create({
        name: req.body.name,
        password: secPass,
        email:req.body.email,
      })
    //extracting user id
    const data={
      user:{
        id:user.id
      }
    }
    //Synchronous Sign with default (HMAC SHA256){token}
    const authtoken= jwt.sign(data,JWT_SECRET);
    console.log(authtoken)
    success=true;
    res.json({success,authtoken})
    // res.json({user})
}catch(error){
 console.error(error.message);
 res.status(500).send("Internal server Error")   
}
} )

//Rote 2: Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login',[
  body('email','Enter a valid email').isEmail(),
  body('password','Password can not be blank').exists(),
], async(req, res)=>{ 
  let success=false;
   //If there are errors ,return bad requiest and errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() }); 
   }
  //trying to signin
  const {email,password}=req.body;
  try {
    let user=await User.findOne({email});
    //if user doesnot exits raise error
    if(!user){
      success=false;
      return res.status(400).json({success,error:"Please try to login with correct credentials"})

    }
    //Comparing password which is already save in db
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      success=false;
      return res.status(400).json({success,error:"Please try to login with correct credentials"})
    }
    //user data which i will be sending{i will be sending id as payload because that has index and unique} (payload)
    const data={
      user:{
        id:user.id
      }
    }
    //Synchronous Sign with default (HMAC SHA256){token}
    const authtoken= jwt.sign(data,JWT_SECRET);
    success=true;
    res.send({success,authtoken})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error") 
    
  }

})

//Rote 3: Get logged in user detail user using: POST "/api/auth/getuser".Login required
router.post('/getuser',fetchuser ,async(req, res)=>{ 
try {
  userId=req.user.id;
  const user=await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server Error") 
  
}
})
module.exports = router