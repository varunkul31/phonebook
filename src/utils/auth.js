const express=require('express');
const {SERVER}=require('../config/environment')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log("token is :"+token);
        if(token===SERVER.AUTH_TOKEN)
        {
            next()
        }
        else{
            throw new Error()
        }
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.',e });
    }
}

module.exports = auth