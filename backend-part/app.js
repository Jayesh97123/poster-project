let express = require("express");
let cors = require("cors");
let mongoClient = require("mongodb").MongoClient;
let parser = require("body-parser");
let app = express();

let dbUrl = "mongodb://localhost:27017";

let port = 3003;

app.listen(port, ()=> console.log(`Server port running in ${port}`));

app.use(parser.json());

app.use(cors());

//get login data
app.get('/signupEmail/:email', (request, response) => {
    mongoClient.connect(dbUrl, {useNewUrlParser:true}, (err, client) => {
        // console.log(err, client)
        if(err) 
            throw err;
        let email = request.params.email;
        let db  = client.db('curdApp');
        db.collection('userData').findOne({email: email}).then((doc)=>{
            if(doc!= null){
                response.status(200).json(doc);
            } else {
                response.status(404).json({'message': `Sorry ${email} doesn't exist`})
            }
            client.close();
        })
    })
});

// check login details
app.get('/login/:email/:password', (request, response) => {
    mongoClient.connect(dbUrl, {useNewUrlParser:true}, (err, client) => {
        // console.log(err, client)
        if(err) 
            throw err;
        let email = request.params.email;
        let password = request.params.password;
        let db  = client.db('curdApp');
        db.collection('userData').findOne({email: email, password: password}).then((doc)=>{
            if(doc!= null){
                response.status(200).json(doc);
            } else {
                response.status(404).json({'message': `Sorry ${email} doesn't exist`})
            }
            client.close();
        })
    })
})

//signup user
app.post("/createUser", (request, response) => {
    mongoClient.connect(dbUrl,{useNewUrlParser:true},(error, client)=>{
        // console.log(error, client)
        if(error) {
            throw error;
        } else {
            // let name = request.params.name;
            // let email = request.params.email;
            // let password = request.params.password;
            let db = client.db("curdApp");
            let customer= request.body;
            let name = customer.name;
            let password = customer.password;
            let email = customer.email;
            db.collection("userData").insertOne({
                "name":name,
                "password" : password,
                "email" : email
                }).then((doc) => { 
               
                if(doc!=null){                
                    response.json(doc);    
                }else{
                    response.json({"message":`Something went wrong`})
                }
                client.close();
            });
            
        }
    });
});

// get poster 
// app.get("/posterData/:email/:id", (request, response) => {
//     // connect(url, parser, callback)
//     mongoClient.connect(dbUrl, {useNewUrlParser:true}, (error, client) => {
//         if(error) 
//             throw error;
//         let db = client.db("curdApp");
//         let email = request.params.email;
//         let id = request.params.id;
//         let cursor = db.collection("userData").findOne({"posterData.id": id, email: email}).then((doc)=>{
//             if(doc!= null){
//                 response.status(200).json(doc);
//             } else {
//                 response.status(404).json({'message': `Sorry ${email} doesn't exist`})
//             }
//             client.close();
//         });
//     });
// });

// create poster
app.post("/createPoster/:email/:id", (request, response) => {
    mongoClient.connect(dbUrl, {useNewUrlParser:true}, (error, client) => {
        if(error) {
            throw error;
        } else {
            // let name = request.params.name;
            // let email = request.params.email;
            // let password = request.params.password;
            let db = client.db("curdApp");
            let email = request.params.email;
            let id = request.params.id;
            let customer= request.body;
            console.log(request.body)
            let title = customer.title;
            let subTitle = customer.subTitle;
            let tag = customer.tag;
            let content = customer.content;
            
            db.collection("userData").updateOne({email: email},
                {"$push":
                    {"posterData": {
                        "id": id,
                        "title": title,
                        "subTitle" : subTitle,
                        "tag" : tag,
                        "content" : content
                    }}
                }
                ).then((doc) => { 
               
                if(doc!=null){                
                    response.json(doc);    
                }else{
                    response.json({"message":`Something went wrong`})
                }
                client.close();
            })
            
        }
    });
});

// update poster data
app.put("/updatePoster/:email/:id",(request,response)=>{
    mongoClient.connect(dbUrl,{useNewUrlParser:true},(error,client)=>{
        if(error){
            throw error
        } else{
            let email = request.params.email;
            let id = request.params.id;
            let data = request.body;
            console.log(data)
            let title = data.title;
            let subTitle = data.subTitle;
            let tag = data.tag;
            let content = data.content;
            let db = client.db("curdApp");
            db.collection("userData").updateOne({email: email, "posterData.id":id},{$set:{"posterData.$.title": title, 
                "posterData.$.subTitle": subTitle, 
                "posterData.$.tag": tag,
                "posterData.$.content": content
            }}).then((doc)=>{
                response.status(200).json(doc);
                client.close();
            })
        }
    })
});

//delete poster data
// app.delete('/deletePoster/:id',(req,res)=>{
//     res.status(200).json({
//         _id:req.params.id
//     })
// })