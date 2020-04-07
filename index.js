const express= require('express');
const cors = require('cors');
const bodyparser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();


app.use(cors());
app.use(bodyparser.json())


const dbUser = process.env.DB_USER;
const pass = process.env.DB_PASS;
const uri = process.env.DB_PATH;


let client = new MongoClient(uri, { useNewUrlParser: true });
const users = ['Mobin', 'Shuvo', 'Salek', 'Hasan', 'Rifat', 'Najmul'];



//database connection




app.get('/products', (req, res)=>{
    client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        
        collection.find().limit(8).toArray((err, documents)=>{
           
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
            }
            
        });
        
        client.close();
      });
      
   
   });
   
// app.get('/fruits/banana',(req, res)=>{
//     res.send({fruits:'banana', quality:1000, price:1000});
// })

//    app.get('/students/information',(req, res)=>{
//        const information1={
//            name:'Mobin',
//            id:206,
//        }  
     
//        res.send(information1);
      
//    })
   

//    app.get('/users/:id', (req, res)=>{
//        const ID = req.params.id;
//        const name = users[ID];

//        res.send({name:name, userId:ID});
//    })

   //..........post.........
   app.post('/addProduct', (req, res)=>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    //console.log('data received',req.body);
    //save to Database
    const product = req.body;
   // user.id = 55;
    console.log(product);
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        // perform actions on the collection object
        collection.insertOne( product, (err, result)=>{
            // console.log('successfully inserted....',result);
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
            
        })
        //console.log('Database connected...');
        client.close();
      });      
   });

   const port = process.env.PORT || 4200;
app.listen(port, () => console.log("Listeninig to port 4200"));