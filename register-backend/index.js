//Packages
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
// import { ObjectId } from 'mongodb';

//Models
import { FreeTime } from './Models/FreeTime.js'
import { Venue } from './Models/Venues.js'

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

//Schema Defination And Initialization
app.get("/", (req, res) => {
    res.send("my API")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//Logic Per Route

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

//venuefr Venue From Frontend
app.put('/addfreetime', async function (req, res) {
    console.log("Backedn Excecuted")
    const from = req.body.from
    const till = req.body.till
    const venuefr = req.body.venue
    const email = "rushimhetre@gmail.com"

    //Temporarly hardcoded
    // const isverified = true



    FreeTime.findOne({ email: email }, async (err, freetime) => {

        if (freetime) {
            console.log({ message: "Update" });

            try {
                const updatedFreetime = await FreeTime.updateOne(
                    { _id: freetime._id },
                    {
                        $push: {
                            slot: {
                                from,
                                till,
                                venuefr
                            }
                        }
                    }
                );
                console.log({ message: "Slot Added Successfully!!!" });
            } catch (err) {
                console.log(err);
            }

        } else {
            const freeTime = new FreeTime({
                email,
                slot: [{ from, till, venuefr }]
            });

            freeTime.save(err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log({ message: "Slot Added Successfully!!!" });
                }
            });
        }
    });

    Venue.findOne({ email: email }, async (err, venue) => {
        if (venue) {
            console.log("eat 1* 2* 3* 4* 5*")
        } else {
            const venue = new Venue({
                email,
                venuefr
            })
            venue.save(err => {
                if (err) {
                    console.log(err)
                } else {
                    console.log({ message: "Venue Added succesfully!!" })
                }
            })

        }
    })

});

app.listen(9002, () => {
    console.log("DB started on port 9002")
})
