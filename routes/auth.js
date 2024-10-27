const User = require('../model/User');
const express=require('express');
const router=express.Router();
// const {check,validationResult}=require('express-validator');
const {adminLogin,adminLogout}=require('../controller/auth');


router.post('/admin/login',adminLogin);
router.get('/admin/logout',adminLogout);

module.exports=router;