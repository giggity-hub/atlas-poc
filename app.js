require('dotenv').config()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const express = require('express')
const app = express()
// parse requests as json
app.use(express.json())

// connect to DB
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.d0wqi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(uri, (err)=> {
    if (err) {
        throw err
    }else{
        console.log('🎉 connected to DB');
    }
})


// Create DB Schema
const kittySchema = new mongoose.Schema({
    name: String
  });

const Kitten = mongoose.model('Kitten', kittySchema);


// define express endpoints
app.post('/cat', (req, res)=> {

    const cat = new Kitten({
        name: req.body.name
    })
    cat.save((err)=>{
        if(err){
            res.status(400).send(err)
        }else{
            res.status(200).send(cat)
        }
    })
})

app.listen(3000, ()=>{
    console.log("listening on http://localhost:3000");
})