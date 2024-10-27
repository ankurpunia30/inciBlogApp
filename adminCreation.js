//admin creation
const User = require('./model/User');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const email = "abcd@gmail.com";
const password="123456";
const name="admin2";
const role="admin";
const adminCreation = async (req, res) => {
    try{
        const user=await User.findOne({email});
        if(user){
            console.log("Admin already exists");
            return ;
            // return res.status(400).json({error: "Admin already exists"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new User({
            email,
            password:hashedPassword,
            name,
            role
        });
        await newUser.save();
        console.log("Admin created successfully");
        // res.json({message: "Admin created successfully"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: "Internal server error"});
    }
}

module.exports = {
    adminCreation
};