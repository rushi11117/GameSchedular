import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/playersDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB Connected")
})

app.get("/", (req, res) => {
    res.send("my API")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

const freeTimeSchema = new mongoose.Schema({
    email : String,
    from: String,
    till : String,
    venue : String
})

const FreeTime = new mongoose.model("FreeTime", freeTimeSchema)

//routes

app.post("/login", (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        console.log(user.password)
        if (user) {
            if (password === user.password) {
                res.send({ message: "Loged in successfully!!", user: user })
                console.log(user)
            } else {
                res.send({ message: "password did't match" })
            }
        } else {
            res.send({ message: "User not exist!!" })
        }
    })
})

app.post("/register", (req, res) => {
    const { name, email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "user already registered!!" })
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "user created succesfully!!" })
                }
            })
        }
    })

})




app.put('/addfreetime', async function (req, res)  {
    const from = req.body.from
    const till = req.body.till
    const venue = req.body.venue
    const email = "rushimhetre@gmail.com"
    


    const freeTime = new FreeTime({
        email,
        from,
        till,
        venue
    })

    // //Get Session Id Here
    // const id = new Id({
    //     id : req.body.email
    // })
    await Padhlo.updateOne(
        {"courses.course": "Btech" , "courses.semesters.sem": 1},
        { $addToSet : { "courses.semesters.$.subjects": subject } },
        function(err)
        {
            if(!err)
            {
                res.status(200).send("OK");
            }
            else
            {
                res.status(404).send(err);
            }
        }
        )

    // freeTime.save(err => {
        
    //     if (err) {
    //         res.send(err)
    //     } else {
    //         res.send({ message: "Time Slot Added Succesfully!!" })
    //     }
    // })
   
  });

app.listen(9002, () => {
    console.log("DB started on port 9002")
})
