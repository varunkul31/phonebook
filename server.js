const express=require('express');
const app=express();
const path=require('path');
const {SERVER}=require('./src/config/environment');
const {contactRouter}=require('./src/modules/contact/contactRoute')
require('./src/utils/db');

app.use('/',express.static(path.join(__dirname,'../public')));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

//DEMO -TEST ROUTE.
app.get('/',(req,res)=>{res.send("Hello World!")});


//contact ROUTER
app.use(contactRouter);


// STARTING SERVER ON PORT
app.listen(SERVER.PORT,()=>{
    console.log(`server started on port ${SERVER.PORT}`);
 })
