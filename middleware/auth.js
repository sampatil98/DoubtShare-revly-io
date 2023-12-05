const jwt=require("jsonwebtoken");
require("dotenv").config();

const authentication= async (req,res,next)=>{
    
    let token = req.headers.authorization;
    
    if(token){
        try{
                       
            token=token.split(" ")[1];
            
            let decode= jwt.verify(token,process.env.secret_token_key);

            if(decode){

                // attaching decoded data from jwt token with req.body
                req.body.user=decode;
                next();
            }else{
                res.status(400).send({
                    isError:true,
                    message:"Not a valid token"
                });
            }
        }catch(error){
            res.status(500).send({
                isError:true,
                message:error.message});
        }
    }else{
        res.status(400).send({
            isError:true,
            message:"Token required"
        });
    }

}

module.exports={authentication}