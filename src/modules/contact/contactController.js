const {Contact}=require('./contactModel');
const { response } = require('express');

const addNewContact=async(req,res)=>{
    try {

        let isEmailExist=await Contact.findOne({email:req.body.email});
        if(isEmailExist)
        {
           res.status(400).send({
               "message":"contact with this email already exist,try Another",
               "email":req.body.email
           })
        }
        const contact=new Contact(req.body);
        await contact.save();
        res.status(201).send({
            "message":"Contact succesfully added to phonebook",
            contactDetails:req.body
        })
    } catch (error) {
        res.send(error);
    }
}

const updateContact=async(req,res)=>{
    try {
         let contact_id=req.body.contact_id;
        let updateResponse=await Contact.findByIdAndUpdate(contact_id,{
            ...req.body
        })
        if(updateResponse)
        {
            res.status(200).send({
                "statusCode":200,
                 "message":"contact succesfully updated",
                 "data":req.body
            })
        }
        else{
            res.status(400).send("failed to update contact,TryAgain");
        }
    } catch (error) {
        res.send(error);
    }
}

const deleteContact=async(req,res)=>{
    try {
         let email=req.body.email;
        let updateResponse=await Contact.deleteOne({_email:req.body.contact_id,});
            res.status(200).send({
                "statusCode":200,
                 "message":"contact deleted sucessfully",
                 "data":req.body
            })
    } catch (error) {
        res.send(error);
    }
}

const getAllContacts=async(req,res)=>{
  try {
    let limit=req.body.limit || 10;
    if (limit) {
        limit = Math.abs(limit);
    }
    if (page && (page != 0)) {
        page = Math.abs(page);
    } else {
        page = 1;
    }
    let skip = (limit * (page - 1));
     let result=await Contact.aggregate(
         [ 
             {
                 $sort:{
                     "email":1
                 }
             },
             {
                $skip:skip  
             },
             {
                 $limit:limit+1
             },
             {
                 $project:{
                     "_id":1,
                     "name":1,
                     "phoneNumber":1,
                     "email":1
                 }
             }
         ]
     );
			let next_hit = 0;
			let total = 0;
			let total_page = 0;
			if (pageCount) {
				total = result[1] && result[1][0] ? result[1][0]['total'] : 0;
				total_page = Math.ceil(total / limit);
			}
			let data= result[0];
			if (result[0].length > limit) {
				next_hit = page + 1;
				data = result[0].slice(0, limit);
			}
			response.status(200).send ({
				data: data,
				total: total,
				page: page,
				total_page: total_page,
				next_hit: next_hit,
				limit: limit
			});
  } catch (error) {
      res.send(error);
  }
}


module.exports={
    addNewContact
}