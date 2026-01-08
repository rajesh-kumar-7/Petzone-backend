import express from 'express'
import Protectedroutes from '../middleware/isAuth.js'
import userModel from '../model/user.js'
import petModel from '../model/pet.js'
const Router = express.Router()
Router.get("/dashboard",Protectedroutes,async (req,res)=>{
    const user = await userModel.findById(req.user.id).select("username")
    res.json({msg:"success",user:`${user.username}`})
})
Router.get('/check',Protectedroutes,(req,res)=>{
    res.json({msg:"ok"})
})
Router.get('/Adopt',Protectedroutes,async (req,res)=>{
    const petData = await petModel.find()
    res.json(petData)
})

Router.post('/addpet',Protectedroutes,async (req,res)=>{
let  {petName,desc,type,location,contact,image}=req.body

let postCreated = await petModel.create({
    owner:req.user.id,petName,desc,type,location,contact,image
})
res.json({msg:"done"})
})
export default Router