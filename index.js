import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authrout from "./routes/authentication.js"
import Routes from "./routes/routes.js"
import cookieparser from "cookie-parser"
dotenv.config();
import cors from 'cors'
const app = express()
app.use(cookieparser())
app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

const url = process.env.MONGO_URL;
const port = process.env.PORT;
mongoose.connect(url)
    .then(() => {
        console.log("connected")
    })
    .catch(e => console.log(e))
app.use("/auth", authrout);
app.use("/home",Routes)
app.use("/check",Routes)

app.listen(port, () => {
    console.log(port);
})
