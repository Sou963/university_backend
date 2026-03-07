const express = require('express');
const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const connectdb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to MongoDB");
    }
    catch(err){
        console.log("error connecting to MongoDB",err);
    }
}

module.exports=connectdb;