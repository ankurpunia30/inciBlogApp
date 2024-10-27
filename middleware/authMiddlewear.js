require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

// Middleware to allow only authenticated users to access the routes
const authMiddleware = async (req, res, next) => {
    try {
        // Check if the authorization header is present
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        // Extract the token from the "Bearer <token>" format
        const token = authHeader.split(" ")[1];
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        // Verify the token using the secret from the environment
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        // console.log(req.user);
        // // Find the user based on the decoded ID
        // const user = await User.findById(req.user.id);
        // console.log(user);
        // if (!user) {
        //     return res.status(401).json({ message: "Unauthorized access" });
        // }
        // const user= User.findById("671e4037ca982a0b0710a7a9");
        // console.log(user);
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        return res.status(401).json({ message: "Unauthorized access", error });
    }
};

module.exports = authMiddleware;
