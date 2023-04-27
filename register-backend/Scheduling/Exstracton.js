import express from "express"
// import { ObjectId } from 'mongodb';


const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

//Connection
mongoose.connect("mongodb://127.0.0.1:27017/playersDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB Connected")
})