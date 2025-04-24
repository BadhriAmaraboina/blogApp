//create mini express application

const exp = require('express');

const adminApp = exp.Router();


adminApp.get('/admin',(req,res) => {
    res.send({message:"all admins"});
})



module.exports = adminApp;