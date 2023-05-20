// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://127.0.0.1:27017/mydatabase';

// /*

// code with uresolved promises

// */


// // async function getSlots(url) {
// //   MongoClient.connect(url, function (err, client) {
// //     if (err) throw err;

// //     const db = client.db('playersDB');

// //     db.collection('freetimes').find({}, { projection: { _id: 0, email: 1, slot: 1 } }).toArray(function (err, result) {
// //       if (err) throw err;

// //       const output = [];

// //       result.forEach(function (doc) {
// //         const email = doc.email;

// //         doc.slot.forEach(function (slot) {
// //           const obj = {
// //             from: slot.from,
// //             till: slot.till,
// //             location: slot.venuefr,
// //             player: email
// //           };

// //           output.push(obj);
// //         });
// //       });

// //       // return output
// //       console.log(output);
// //       client.close();
// //     });
// //   });
// // }


// /*

//   code with resolved promises

// */


// const getSlots = async () => {
//   try {
//     const client = await MongoClient.connect(url, { useUnifiedTopology: true });
//     const db = client.db('mydb');
//     const collection = db.collection('booking');
//     const cursor = collection.find({}, { projection: { email: 1, slot: 1, _id: 0 } });
//     const result = await cursor.toArray();
//     return result.map(({ email, slot }) => ({
//       email,
//       ...slot.map(({ from, till, venuefr }) => ({ from, till, venuefr })),
//     }));
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// };


// module.exports = getSlots;




const MongoClient = require('mongodb').MongoClient;
// Connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'PlayersDB';
const react = require('react')
// import react from "react"
// Collection names
const freetimeCollection = 'games';
const gameScheduleCollection = 'gamehistory';

// Function to compare time intervals
function areTimeIntervalsOverlapping(interval1, interval2) {
  const start1 = new Date(interval1.from);
  const end1 = new Date(interval1.till);
  const start2 = new Date(interval2.from);
  const end2 = new Date(interval2.till);

  return start1 <= end2 && start2 <= end1;
}

// Function to schedule games
async function scheduleGames() {
  console.log("1")
  // Connect to the MongoDB database
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);

  try {
    // Retrieve all users' freetime data
    const users = await db.collection(freetimeCollection).find().toArray();

    const gameSchedules = [];

    console.log("2")
    // Compare freetime data to schedule games
    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];

      for (let j = i + 1; j < users.length; j++) {
        const otherUser = users[j];

        // Compare the freetime slots of the two users
        for (const currentUserSlot of currentUser.freetime) {
          for (const otherUserSlot of otherUser.freetime) {
            if (
              areTimeIntervalsOverlapping(currentUserSlot, otherUserSlot) &&
              currentUserSlot.venue === otherUserSlot.venue
              // console.log("3")
            ) {
              // Create a game schedule object
              const gameSchedule = {
                player1: currentUser._id,
                player2: otherUser._id,
                gametime: {
                  from: currentUserSlot.from,
                  till: currentUserSlot.till
                },
                result: null
              };

              gameSchedules.push(gameSchedule);
            }
          }

        }
      }
    }

    // Store the game schedule objects in the new collection
    await db.collection(gameScheduleCollection).insertMany(gameSchedules);

    console.log('Games scheduled successfully!');
  } catch (error) {
    console.error('Error scheduling games:', error);
  } finally {
    // Close the database connection
    client.close();
  }
}

// Call the scheduleGames function

async function scheduleGames() {
  // Connect to the MongoDB database
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  console.log("4")

  try {
    // Retrieve all users' freetime data
    const users = await db.collection(freetimeCollection).find().toArray();

    const gameSchedules = [];
    console.log("5")

    // Compare freetime data to schedule games
    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];

      for (let j = i + 1; j < users.length; j++) {
        const otherUser = users[j];
        console.log("6")

        // Compare the freetime slots of the two users
        for (const currentUserSlot of currentUser.freetime) {
          for (const otherUserSlot of otherUser.freetime) {
            if (
              areTimeIntervalsOverlapping(currentUserSlot, otherUserSlot) &&
              currentUserSlot.venue === otherUserSlot.venue
            ) {
              console.log("7")
              // Create a game schedule object
              const gameSchedule = {
                player1: currentUser._id,
                player2: otherUser._id,
                gametime: {
                  from: currentUserSlot.from,
                  till: currentUserSlot.till
                },
                result: null
              };

              gameSchedules.push(gameSchedule);
            }
          }
        }
      }
    }

    // Store the game schedule objects in the new collection
    await db.collection(gameScheduleCollection).insertMany(gameSchedules);

    console.log('Games scheduled successfully!');
  } catch (error) {
    console.error('Error scheduling games:', error);
  } finally {
    // Close the database connection
    client.close();
  }
}
console.log("1")
scheduleGames();
