const jwt= require("jsonwebtoken");

const authentication= (req,res,next)=>{

    const token= req.headers.authorization;

    if(token){
        jwt.verify(token, 'masai', function(err, decoded) {
            
            if(decoded){
                req.body.user=decoded.userID;
                next();
            }
            else{
                res.send({"Msg":"Please Login"})
            }
          });
    }
    else{
        res.send({"Msg":"Please Login"})
    }
}

module.exports={authentication};