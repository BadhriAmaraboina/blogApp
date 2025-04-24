
//create mini express application


const exp = require('express');


const authorApp = exp.Router();

const bcryptjs = require('bcryptjs')

const Jsonwebtoken = require('jsonwebtoken');

const verifyToken = require('../Middlewares/verifyToken');

const expressAsyncHandler = require('express-async-handler');

let authorsCollectionobj;
let articlesCollectionobj;

authorApp.use((req,res,next)=>{
    authorsCollectionobj = req.app.get('authorsCollection');
    articlesCollectionobj = req.app.get('articlesCollection');
    next();
})




authorApp.get('/articles/:username',verifyToken,async(req,res) => {
    
    const authorName = req.params.username;

    const articlesList = await articlesCollectionobj.find({
        username: authorName
    }).toArray();
    

    res.send({message:"List of articles",payload:articlesList});
})    



authorApp.post('/register',expressAsyncHandler(async (req,res)=>{
    const author = req.body;

    const dbres = await authorsCollectionobj.findOne({username:author.username});

    if(dbres !== null){
        res.send({message:"author already existed"});
    }
    else{
        const hashpass = await bcryptjs.hash(author.password,6);

        author.password = hashpass;
        
        await authorsCollectionobj.insertOne(author);

        res.send({message:"author created"});
    }
}))



authorApp.post('/login',expressAsyncHandler(async (req,res) =>{
    const user = req.body;

    const dbres = await authorsCollectionobj.findOne({username:user.username});

    if(dbres === null){
        res.send({message:"Invalid authorname"});
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


authorApp.post('/article',verifyToken,expressAsyncHandler(async(req,res) =>{

    const newArticle = req.body;

    await articlesCollectionobj.insertOne(newArticle);

    res.send({message:"New article created"});

}))


authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res) =>{
    const modifiedArticle = req.body;

    let result = await articlesCollectionobj.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}});

    let latestArticle = await articlesCollectionobj.findOne({articleId:modifiedArticle.articleId})

    res.send({message:"Article modified",article:latestArticle});
}))


authorApp.put('/articleremove',verifyToken,expressAsyncHandler(async(req,res) =>{
    const modifiedarticle = req.body;

    await articlesCollectionobj.updateOne({articleId:modifiedarticle.articleId},{$set:{...modifiedarticle,status:false}});

    res.send({message:"article removed"});
}))


//delete an article by article ID
authorApp.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get articleId from url
    const artileIdFromUrl=(+req.params.articleId);
    //get article 
    const articleToDelete=req.body;

    if(articleToDelete.status===true){
       let modifiedArt= await articlesCollectionobj.findOneAndUpdate({articleId:artileIdFromUrl},{$set:{...articleToDelete,status:false}},{returnDocument:"after"})
       res.send({message:"article deleted",payload:modifiedArt.status})
    }
    if(articleToDelete.status===false){
        let modifiedArt= await articlesCollectionobj.findOneAndUpdate({articleId:artileIdFromUrl},{$set:{...articleToDelete,status:true}},{returnDocument:"after"})
        res.send({message:"article restored",payload:modifiedArt.status})
    }
   
   
}))


module.exports = authorApp;