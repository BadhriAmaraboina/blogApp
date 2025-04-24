
const jwt = require('jsonwebtoken');

require('dotenv').config();

function verifyToken(req,res,next){

    const bearertoken = req.headers.authorization;

    if(!bearertoken){
        res.send({message:"unauthorized access plz login"});
    }

    const token = bearertoken.split(' ')[1];

    try{

        jwt.verify(token,process.env.SECRET_KEY);
        next();
    }
    catch(err){
        next(err);
    }
    
}


module.exports = verifyToken;