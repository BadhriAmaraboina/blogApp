//creating express application

const exp = require('express')

const app = exp();

app.use(exp.json())

require('dotenv').config()

const path = require('path');

app.use(exp.static(path.join(__dirname,'../client/build')))

const port = process.env.PORT || 5000

const mc = require('mongodb').MongoClient

mc.connect(process.env.MONGODB_URL)
.then(client => {
    //get database
    const dbobj = client.db('blogdb1');
    //get collection
    const usersCollection  = dbobj.collection('usersCollection');

    const articlesCollection = dbobj.collection('articlesCollection');

    const authorsCollection = dbobj.collection('authorsCollection');

    app.set('usersCollection',usersCollection);

    app.set('articlesCollection',articlesCollection);

    app.set('authorsCollection',authorsCollection);

    console.log("DB connection success");

})
.catch(err => console.log(err));


const userApp = require('./Apis/userApi');

const authorApp = require('./Apis/authorApi');

const adminApp = require('./Apis/adminApi');


app.use('/user-api',userApp);

app.use('/author-api',authorApp);

app.use('/admin-api',adminApp);

app.use((req,res,next) => {
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})

app.use((err,req,res,next) =>{
    res.send({message:err.message});
})

app.listen(port,()=>console.log(`web server running on port ${port}`));