
import jwt from 'jsonwebtoken'
const Protectedroutes = (req,res,next)=>{
    const token = req.cookies.token
    if(!token){
       return res.status(401).json({msg:"invalid token"})
    }
    else{
        try{
            const verify = jwt.verify(token,process.env.SECRET)
            req.user=verify
            next();
        }
        catch{
           return res.status(401).json({msg:"invalid token"})
        }
    }
}
export default Protectedroutes