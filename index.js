import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authrout from "./routes/authentication.js"
import Routes from "./routes/routes.js"
import cookieparser from "cookie-parser"
dotenv.config();
import cors from 'cors'
const app = express()
app.set("trust proxy",1)

app.use(cookieparser())
app.use(express.json())
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://petzone.vercel.app",
    "https://petzone-cv598ec46-rajesh-kumar-7s-projects.vercel.app",

"https://petzone-git-main-rajesh-kumar-7s-projects.vercel.app",
"https://petzone-pscgt4xpy-rajesh-kumar-7s-projects.vercel.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
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
