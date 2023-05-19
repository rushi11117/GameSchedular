//Packages
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
// import { ObjectId } from 'mongodb';

//Models
import { FreeTime } from './Models/FreeTime.js'
import { Venue } from './Models/Venues.js'
// import Game  from './Models/GameReq.js'
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())



// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

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
    password: String,
    profilePic: String
})

const User = new mongoose.model("User", userSchema)


const gameSchema = new mongoose.Schema({
    email: String,
    
    freetime: [
        {
            game: String,
            from: Date,
            till: Date,
        },
    ],
});

const Game = new mongoose.model("Game", gameSchema)
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


//register
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

//update Profile

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, 'uploads')); // Use an absolute path
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname);
//     },
//   });


const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },


});


const upload = multer({ storage: storage });

// Endpoint for handling the profile form submission
app.post('/api/user/profile', upload.single('profilePic'), async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        console.log(pathname);
        const profilePic = req.file.filename.slice(3); // The uploaded file is available as req.file

        // Create a new user document and save it to the database
        const user = new User({
            email,
            password,
            confirmPassword,
            profilePic,
        });
        await user.save();

        res.json({ message: 'User profile saved successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});


app.put('/addfreetime', (req, res) => {
    const { email, game, from, till } = req.body;
    console.log(req.body);
    // Create a new document and update the freetime array for the email
    Game.findOneAndUpdate(
        { email },
        { $push: { freetime: { game, from, till } } },
        { upsert: true }
    )
        .then(() => res.sendStatus(200))
        .catch((error) => {
            console.error(error);
            res.sendStatus(500);
        });
});

//venuefr Venue From Frontend
// app.put('/addfreetime', async function (req, res) {
//     console.log(req.body)
//     const game = req.body.game
//     const from = req.body.from
//     const till = req.body.till
//     const venuefr = req.body.venue
//     const email = req.body.email



//     FreeTime.findOne({ email: email }, async (err, freetime) => {

//         if (freetime) {
//             console.log({ message: "Update" });

//             try {
//                 const updatedFreetime = await FreeTime.updateOne(
//                     { _id: freetime._id },
//                     {
//                         $push: {
//                             slot: {
//                                 from,
//                                 till,
//                                 venuefr
//                             }
//                         }
//                     }
//                 );
//                 console.log({ message: "Slot Added Successfully!!!" });
//             } catch (err) {
//                 console.log(err);
//             }

//         } else {
//             const freeTime = new FreeTime({
//                 game,
//                 email,
//                 slot: [{ from, till, venuefr }]
//             });

//             freeTime.save(err => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log({ message: "Slot Added Successfully!!!" });
//                 }
//             });
//         }
//     });

//     Venue.findOne({ email: email }, async (err, venue) => {
//         if (venue) {
//             console.log("eat 1* 2* 3* 4* 5*")
//         } else {
//             const venue = new Venue({
//                 email,
//                 venuefr
//             })
//             venue.save(err => {
//                 if (err) {
//                     console.log(err)
//                 } else {
//                     console.log({ message: "Venue Added succesfully!!" })
//                 }
//             })

//         }
//     })

// });

app.listen(9002, () => {
    console.log("DB started on port 9002")
})