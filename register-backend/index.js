//Packages
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import { documentsAdded, documentsAddedCount, resetdocumentsAddedCount } from "./DataBaseUtil/sedularSession.js"
import { retrieveData } from "./retrive.cjs";
import { ScheduledGamesSchema } from "./Scheduling/logic.mjs"
import { isDuplicateDocument } from "./DataBaseUtil/isDuplicateDocument.cjs"

//Models
import { FreeTime } from './Models/FreeTime.js'

const Schema = mongoose.Schemas;
const app = express()
const ScheduledGame = new mongoose.model("ScheduledGame", ScheduledGamesSchema)

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

//Connection
mongoose.connect("mongodb://127.0.0.1:27017/playersDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB Connected")
    // retrieveData((retrievedArray) => {
    //     console.log(retrievedArray);
    // });
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


const venueSchema = new mongoose.Schema({
    venuefr: String,
    email: String
})

const Venue = new mongoose.model("Venue", venueSchema)

//Game Requested by user
const gameSchema = new mongoose.Schema({
    email: String,

    freetime: [
        {
            game: String,
            from: Date,
            till: Date,
            venue: String,
        },
    ],
});

const Game = new mongoose.model("Game", gameSchema)


// slots to process time

const slotSchema = new mongoose.Schema({
    games_id: String,
    email: String,
    game: String,
    venue: String,
    from: Date,
    till: Date,
    status: String
})
const Slot = new mongoose.model("Slot", slotSchema)


// const collection = db.collection(collectionName);

Game.find({}, (err, documents) => {
    if (err) {
        console.error('Error retrieving documents:', err);
        client.close();
        return;
    }

    // Print all documents

    console.log('All documents in the collection:');
    documents.forEach((doc) => {
        const email = doc.email;
        doc.freetime.forEach((ft) => {
            const game = ft.game;
            const venue = ft.venue;
            const from = ft.from;
            const till = ft.till;
            const games_id = ft._id;
            console.log("slots:", games_id)
            const tmpslot = new Slot({
                games_id,
                email,
                game,
                venue,
                from,
                till,
                status: "NS"
            })

            Slot.exists({ games_id }, (err, existingOnject) => {
                if (err) {
                    console.log("Error:", err);
                } else if (existingOnject) {
                    console.log("Exact Object Already Exists");
                } else {
                    tmpslot.save()
                        .then(savedObj => {
                            console.log("Slots Updated!!");
                        })
                        .catch(error => {
                            console.error('Error saving object:', error.message);
                        });
                }
            })
        })

    });
});



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



    const { email, game, from, till, venuefr } = req.body;
    console.log(req.body.venuefr);
    // Create a new document and update the freetime array for the email
    Game.findOneAndUpdate(
        { email },
        { $push: { freetime: { game, venuefr, from, till } } },
        { upsert: true }
    )
        .then(documentsAdded())
        .then(console.log(documentsAddedCount))
        .then(() => res.sendStatus(200))
        .catch((error) => {
            console.error(error);
            res.sendStatus(500);
        });
    if (documentsAddedCount === 4) {
        ScheduleGames()
        resetdocumentsAddedCount()
    }

    //Update Vanue List
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


// Collection name
const gameScheduleCollection = 'gamehostory';
const db = 'playersDB'
// API endpoint to retrieve all scheduled games
// app.get('/games', async (req, res) => {

//     try {
//         // Retrieve all scheduled games from the collection
//         const games = await db.gameScheduleCollection(gameScheduleCollection).find().toArray();

//         // Send the games as a response
//         res.json(games);

//         // Close the database connection
//         client.close();
//     } catch (error) {
//         console.error('Error retrieving games:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });



app.get('/gamesnear', (req, res) => {

    ScheduledGame.find({})
        .then((schedule) => {
            // console.log('All Users:', users);
            res.send(schedule)
        })
        .catch((error) => {
            console.error('Error querying users:', error);
        });

});


app.listen(9002, () => {
    console.log("DB started on port 9002")
})