const express = require('express');
const User = require('../models/User');
const router = express.Router(); 
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const JWT_SECRET='Salikisagoodb$boy'

// Create a User using: POST "/api/auth/". No login required
router.post('/createuser',[
    body('email','Enter a valid email').isEmail(),
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
], async(req, res)=>{ 
    //If there are errors ,return bad requiest and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); 
    }
    //check whether the user with same email exists already
   try{
   let user=await User.findOne({email:req.body.email});
   
   if(user){
    return res.status(400).json({error:'Sorry a user with this email already exists'});
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
    res.json({authtoken})
    // res.json({user})
}catch(error){
 console.error(error.message);
 res.status(500).send("Some error occured")   
}
} )

module.exports = router