const express= require("express");
const { connection } = require("./db");
const app= express();
const cors= require("cors");
require("dotenv").config();

app.use(express.json())
const {userRouter}= require("./routes/user.route")
const {postRouter}= require("./routes/post.route")
const {authentication}= require("./middleware/middleware")

app.get("/",(req,res)=>{
    res.send("Home Page");
})


app.use(cors());
app.use("/users",userRouter);
app.use(authentication);
app.use("/posts",postRouter);

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("Mongo DB is running")
    }
    catch(err){
        console.log(err);
    }
    console.log("Server is running at Port 8000")
})