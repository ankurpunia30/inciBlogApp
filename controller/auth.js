//login,logout functionality

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
// const { validationResult } = require('express-validator');

//admin creation
//done with script

//admin login
const adminLogin = async (req, res) => {
    const {email,password}=req.body;
    try{
        if(!email || !password){
            return res.status(400).json({error: "All fields are required"});
        }
        const user=await User.findOne({email});
        if(user){
            const isMatch=await bcrypt.compare(password,user.password);
            if(isMatch){
                const payload={
                    user:{
                        id:user.id
                    }
                };
                jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:360000},(err,token)=>{
                    if(err) throw err;
                    res.json({token});
                });
            }else{
                return res.status(400).json({error: "Invalid credentials"});
            }
        }
        else{
            return res.status(400).json({error: "Invalid credentials"});
        }

    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: "Internal server error"});
    }
};


//user logout
const adminLogout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.json({ message: 'Logged out successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    adminLogin,
    adminLogout
};
