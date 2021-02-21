const express = require('express')
//const auth = require('../middleware/auth')
const {SERVER}=require('../../config/environment')
const contactController=require('./contactController')
const schemaValid=require('./contactValidation')
const router = new express.Router()
const auth=require('../../utils/auth')

router.post(`${SERVER.API_BASE_URL}/add-contact`, async (req, res) => {
    try {
        let { error } = schemaValid.addContactValidation(req.body);
        if (error) {
        return response.status(400).send(error);
    }
       return await contactController.addNewContact(req,res);
    } catch (e) {
       throw e;
}})

router.put(`${SERVER.API_BASE_URL}/update-contact`,auth,async(req,res)=>{
    try {
        let { error } = schemaValid.updateContactValidation(req.body);
        if (error) {
        return response.status(400).send(error);
    } 
      return await contactController.updateContact(req,res);    
    } catch (error) {
        throw e;    
    }
})

router.delete(`${SERVER.API_BASE_URL}/delete-contact`,auth,async(req,res)=>{
    try {
        if(!req.body.contact_id && !req.body.email)
        {
             res.status(400).send("contact_id or email not found.Bad Request");
        }
        return await contactController.updateContact(req,res);    
    } catch (error) {
        throw e;    
    }})   

router.get(`${SERVER.API_BASE_URL}/get-all-contacts`,auth,async(req,res)=>{
    try {
        let { error } = schemaValid.updateContactValidation(req.body);
        if (error) {
        return response.status(400).send(error);
    } 
        return await contactController.getAllContacts(req,res);    
    } catch (error) {
        throw e;    
    }})




















module.exports={
    contactRouter:router
}