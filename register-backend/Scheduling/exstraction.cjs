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
