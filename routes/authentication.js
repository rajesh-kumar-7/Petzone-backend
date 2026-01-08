import express from "express"
import bcrypt from "bcrypt"
import userModel from '../model/user.js'
import jwt from "jsonwebtoken"
const router = express.Router();


router.post('/register', async (req, res) => {
    let { username, email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const olduser = await userModel.findOne({email})
    if(olduser){
        res.status(401).json({msg:"useralredy exist"})
    }
    else{

        let createdUser = await userModel.create({
            username,
            email,
            password: hash
        })
        
        const token = jwt.sign({ id: createdUser._id }, process.env.SECRET)
        res.cookie("token", token)
        res.json({ msg: "usercreated", user: createdUser })
        
    }
    })
router.post('/sigin', async (req, res) => {
    let { uname, password } = req.body
    const user = await userModel.findOne({ email: uname })
    if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                const token = jwt.sign({ id: user._id }, process.env.SECRET)
                res.cookie("token", token)
                res.json({ msg: "valid user", user: user })
            }
            else {
                res.status(401).json({ msg: "wrong pass" })
            }
        });

    } else {
        res.status(404).json({ msg: "user not exist" })
    }
})

export default router;