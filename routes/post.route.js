const express= require("express");
const postRouter= express.Router();
const {PostModel}= require("../model/post.model")


postRouter.get("/",async(req,res)=>{
    //let query= req.body.query;
    try{
        //console.log(query)
        let user= await PostModel.find({})
        res.send(user)
    }
    catch(err){
        res.send({"Msg":"User is not Logged in"})
    }
        
})


// postRouter.get("/q",async(req,res)=>{
//     let q= req.body.query;
//     try{
//         console.log(q)
//         let user= await PostModel.find({})
//         res.send(user)
//     }
//     catch(er){
//         res.send({"Msg":"Error in getting comment"})
//     }

// }
postRouter.get("/top",async(req,res)=>{
    try{
        let user= await PostModel.find({})
        res.send(user)
    }
    catch(er){
        res.send({"Msg":"Error in getting comment"})
    }

    
})
postRouter.post("/create",async(req,res)=>{
    const data= req.body;
    try{

            const note= new PostModel(data);
            await note.save();
            res.send("Post created")
    }
    catch(err){
        res.send({"Msg":"Error in registering post"})
    }


})

postRouter.patch("/update/:id",async(req,res)=>{
    let id= req.params.id;
    try{
        await PostModel.findByIdAndUpdate({_id:id},req.body);
        res.send({"Msg":"Updated"})

    }
    catch(err){
            res.send({"Msg":"Wrong in Updation"})
    }
    
})
postRouter.delete("/delete/:id",async(req,res)=>{
    let id= req.params.id;
    try{
        await PostModel.findByIdAndDelete({_id:id});
        res.send({"Msg":"Deleted post"})

    }
    catch(err){
            res.send({"Msg":"Not deleted !"})
    }
    
})

module.exports={postRouter}