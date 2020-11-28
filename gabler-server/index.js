require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handler/error");
const authRoutes = require("./routes/auth");
const messagesRoutes= require("./routes/messages");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const { db } = require("./mdels/user");




const PORT = 8081;

app.use(cors());
app.use(bodyParser.json);
//from routes/auth.js
app.use("/api/auth", authRoutes);
//from 
app.use("/api/users/:id/messages", loginRequired, ensureCorrectUser,messagesRoutes);

app.get("/api/messages",loginRequired, async function(req,res,next){
    try{
let messages = await db.message.find().sort({createdAt: "desc"}).populate("user",{
    username:true,
    profileImageUrl:true
});
return res.status(200).json(messages);
    }catch(e){
        return next(e);
    }
})



//all routes here

app.use(function(req,res,next){
    let err = new Error("Not Found");
    next(err);
});

app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`Server has started on ${PORT}`);
})

