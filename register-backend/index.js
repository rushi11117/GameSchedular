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
import {ReflectChanges} from "./DataBaseUtil/ReflectChanges.mjs"
// const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

//Models
import { FreeTime } from './Models/FreeTime.js'
import { error } from "console";

const Schema = mongoose.Schemas;
const { ObjectId } = mongoose;
const app = express()
const ScheduledGame = new mongoose.model("ScheduledGame", ScheduledGamesSchema)

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
ScheduledGame()

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

export const Game = new mongoose.model("Game", gameSchema)


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


export const Slot = new mongoose.model("Slot", slotSchema)


// const collection = db.collection(collectionName);

Game.find({}, (err, documents) => {
    if (err) {
        console.error('Error retrieving documents:', err);
        client.close();
        return;
    }

    // Print all documents

    // console.log('All documents in the collection:');
    documents.forEach((doc) => {
        const email = doc.email;
        doc.freetime.forEach((ft) => {
            const game = ft.game;
            const venue = ft.venue;
            const from = ft.from;
            const till = ft.till;
            const games_id = ft._id;
            // console.log("slots:", games_id)
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
                    // console.log("Exact Object Already Exists");
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



// const __filename = new URL(import.meta.url).pathname;
// const __dirname = path.dirname(__filename);

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, __dirname, 'uploads');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     },


// });


// const upload = multer({ storage: storage });

// // Endpoint for handling the profile form submission
// app.post('/api/user/profile', upload.single('profilePic'), async (req, res) => {
//     try {
//         const { email, password,  } = req.body;
//         console.log(pathname);
//         const profilePic = req.file.filename.slice(3); // The uploaded file is available as req.file

//         // Create a new user document and save it to the database
//         const user = new User({
//             email,
//             password,
//             confirmPassword,
//             profilePic,
//         });
//         await user.save();

//         res.json({ message: 'User profile saved successfully' });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'An error occurred' });
//     }
// });





app.post('/update-profile', upload.single('profilePic'), (req, res) => {
    const { email } = req.body;
    const profilePic = req.file;

    // Update the user profile in the MongoDB user collection
    User.findOneAndUpdate(
        { email }, // Find the user based on the email
        { profilePic: profilePic.filename }, // Update the profilePic field with the filename
        { new: true }, // Return the updated user object
        (err, user) => {
            if (err) {
                // Handle error
                res.status(500).json({ message: 'Failed to update profile.' });
            } else {
                // Handle success
                res.json({ message: 'Profile updated successfully!', user });
            }
        }
    );
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
        ScheduledGame()
        resetdocumentsAddedCount()
    }

    //Update Vanue List
    Venue.findOne({ email: email }, async (err, venue) => {
        if (!venue) {
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


app.get('/getvenues', async (req, res) => {

    try {
        const venues = await Venue.find({}, 'venuefr');
        res.json(venues);
    } catch (error) {
        console.error('Error retrieving about:', error);
        res.status(500).json({ error: 'Failed to retrieve about' });
    }

})

// Collection name
const gameScheduleCollection = 'gamehostory';
const db = 'playersDB'
app.get('/gamesnear', (req, res) => {

    function getName(email) {
        User.findOne({ email: email }, (err, user) => {
            if (error) {
                console.log("error finding user using email:", error)
            } else {
                return user.name
            }
        })
    }


    ScheduledGame.find({})
        .then((schedule) => {
            res.send(schedule)
        })
        .catch((error) => {
            console.error('Error querying users:', error);
        });

});


// app.put('/cancelgame/:id', async (req, res) => {
//     // const game_id = mongoose.Types.ObjectId(req.params.id);
//     const email = req.body.email;
//     const game_id = req.params.id;
//     // Game.findOneAndDelete({ _id: game_id })
//     //     .then(
//     //         // CancelGame(game_id, email),
//     //         console.log("EXCE")
//     //     )

//     // .catch ((error) => {
//     //     console.error("erro deleting game", error)
//     // })


//     Game.findOneAndDelete({ _id: game_id }, (err, deletedDocument) => {
//         if (err) {
//             console.error(err);
//             return;
//         }

//         if (deletedDocument) {
//             console.log('Deleted Document:', deletedDocument);
//         } else {
//             console.log('Document not found.');
//         }
//     });

// })


app.put('/cancelgame/:id', async (req, res) => {
    const game_id = mongoose.Types.ObjectId(req.params.id);
    const email = req.body.email;
    console.log(game_id, typeof (game_id))

    try {
        const deletedDocument = await ScheduledGame.findOneAndDelete({ _id: game_id }).exec();

        if (deletedDocument) {
            console.log('Deleted Document:', deletedDocument);
            ReflectChanges([mongoose.Types.ObjectId(deletedDocument.dslot1),mongoose.Types.ObjectId(deletedDocument.dslot2)],email);
        } else {
            console.log('Document not found.');
        }

        res.status(200).send('Game canceled successfully.');
    } catch (error) {
        console.error('Error deleting game:', error);
        res.status(500).send('An error occurred while canceling the game.');
    }
});




app.put('/addscorecard/:id', async (req, res) => {
    const gameId = req.params.id;
    const updatedGames = req.body;
    const flag = true;
    console.log(req.params.id)
    console.log(req.body)

    try {
        const game = await ScheduledGame.findByIdAndUpdate(gameId, {
            $set: {
                result: updatedGames,
                isCompleated: flag
            },
        }, { new: true });

        res.json(game);
    } catch (error) {
        console.error('Error updating game:', error);
        res.status(500).json({ error: 'Failed to update game' });
    }
});


app.get('/game-results/:id', (req, res) => {
    const gameId = req.params.id;
    console.log("fetching result ")
    ScheduledGame.find({ _id: gameId })
        .then((gameResults) => {
            res.json({ result: gameResults });
        })
        .catch((error) => {
            console.error('Error retrieving game results:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

app.put('/changestatus/:id'), async (req, res) => {
    const gameId = req.params.id;
    const status = !req.body.status;
    console.log(status)
    try {
        const game = await ScheduledGame.findByIdAndUpdate(gameId, {
            $set: {
                isCompleated: !status
            },
        }, { new: true });

    } catch (error) {
        console.error('Error updating game:', error);
        res.status(500).json({ error: 'Failed to update game' });
    }
}



app.listen(9002, () => {
    console.log("DB started on port 9002")
})