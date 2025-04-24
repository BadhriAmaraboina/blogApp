
//create mini express application

const exp = require('express');

const userApp = exp.Router();

const bcryptjs = require('bcryptjs')

const Jsonwebtoken = require('jsonwebtoken');

const verifyToken = require('../Middlewares/verifyToken');

const expressAsyncHandler = require('express-async-handler');

let usersCollectionobj;
let articlesCollectionObj;

userApp.use((req,res,next)=>{
    usersCollectionobj = req.app.get('usersCollection');
    articlesCollectionObj = req.app.get('articlesCollection')
    next();
})




userApp.post('/register',expressAsyncHandler(async (req,res)=>{
    const user = req.body;

    const dbres = await usersCollectionobj.findOne({username:user.username});

    if(dbres !== null){
        res.send({message:"user already existed"});
    }
    else{
        const hashpass = await bcryptjs.hash(user.password,6);

        user.password = hashpass;
        
        await usersCollectionobj.insertOne(user);

        res.send({message:"user created"});
    }
}))



userApp.post('/login',expressAsyncHandler(async (req,res) =>{
    const user = req.body;

    const dbres = await usersCollectionobj.findOne({username:user.username});

    if(dbres === null){
        res.send({message:"Invalid username"});
    }
    else{
        let status = await bcryptjs.compare(user.password,dbres.password);

        if(status == false){
            res.send({message:"Invalid password"});
        }
        else{
            const signedToken = Jsonwebtoken.sign({username:user.username},process.env.SECRET_KEY,{expiresIn:'1d'});

            res.send({message:"login success" , token : signedToken,user:dbres});
        }
    }
}));


userApp.get("/articles",verifyToken,expressAsyncHandler(async(req,res)=>{
    let articlesCollectionObj = req.app.get('articlesCollection');

    let articles = await articlesCollectionObj.find({status:"true"}).toArray();

    res.send({message:"articles",payload:articles});
}))



userApp.post("/comment/:articleId",verifyToken,expressAsyncHandler(async(req,res)=>{

    let articleIdFormUrl = req.params.articleId;

    let userbody = req.body;

    await articlesCollectionObj.updateOne({articleId:articleIdFormUrl},{$addToSet:{comments:userbody}});

    res.send({message:"comment updated"});

}))

module.exports = userApp;