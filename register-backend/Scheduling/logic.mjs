import mongoose from 'mongoose';
import { retrieveData } from '../retrive.cjs';


const Schema = mongoose.Schema;


export const ScheduledGamesSchema = new mongoose.Schema({
  player1: String,
  player2: String,
  startTime: String,
  // result: {
  //   type: Array,
  //   default: [],
  // },
});

const ScheduledGame = new mongoose.model("ScheduledGame", ScheduledGamesSchema)

function findLatestTime(timestamp1str, timestamp2str) {
  
  const timestamp1 = new Date(timestamp1str);
  const timestamp2 = new Date(timestamp2str);
  // Compare the two dates and return the latest (most late) date
  if (timestamp1 < timestamp2) {
    return timestamp2;
    // console.log(timestamp1);
  } else {
    // console.log(timestamp2);
    return timestamp2;
  }
}


async function insertScheduledGames(availablePlayers) {
  const collectionName = "scheduledgames"

  try {

    const db = mongoose.connection;
    const collection = db.collection(collectionName);

    const documents = availablePlayers.map(array => ({ data: array }));
    const result = await collection.insertMany(documents);
    

    console.log(`${result.insertedCount} documents inserted successfully.`);
  } catch (error) {
    console.error('Error inserting scheduled games:', error);
  }
}



function timeSlotsOverlap(slot1, slot2) {
  const slot1Start = new Date(slot1[0]).getTime();
  const slot1End = new Date(slot1[1]).getTime();
  const slot2Start = new Date(slot2[0]).getTime();
  const slot2End = new Date(slot2[1]).getTime();

  // Check if there is an overlap
  if (
    (slot2Start >= slot1Start && slot2Start < slot1End) ||
    (slot1Start >= slot2Start && slot1Start < slot2End)
  ) {
    // Calculate overlapping duration
    const overlapStart = Math.max(slot1Start, slot2Start);
    const overlapEnd = Math.min(slot1End, slot2End);
    const overlapDuration = (overlapEnd - overlapStart) / (1000 * 60);

    // Check if overlap duration exceeds or equals 30 minutes
    if (overlapDuration >= 30) {
      return true;
    }
  }

  return false;
}


function ScheduleGamesFor(slots) {
  console.log("Scheduling Games");

  const availablePlayers = [];

  for (let i = 0; i < slots.length; i++) {
    const currentPlayer = slots[i];
    for (let j = 0; j < slots.length; j++) {
      if (currentPlayer.email !== slots[j].email && timeSlotsOverlap([currentPlayer.from, currentPlayer.till], [slots[j].from, slots[j].till]) && currentPlayer.status === "NS" && slots[j].status === "NS") {
        currentPlayer.status = "S";
        slots[j].status = "S";
        const startTime = currentPlayer.from;
        const player1 = currentPlayer.email;
        const player2 = slots[j].email;
        const tmpSchedule = new ScheduledGame({
          player1,
          player2,
          startTime
        })

        console.log(player2);
        tmpSchedule.save(err =>{
          if(err) {
            console.log("error sving schedule:",err);
          } else {
            console.log("scheduled updated");
          }
        })

        
        // const playersPair = [currentPlayer.game_id, slots[j].game_id, findLatestTime([currentPlayer.from, slots[j].from])];
        // availablePlayers.push(playersPair);
      }
    }
  }
  // return availablePlayers;
}


export function ScheduleGames() {

  console.log("Excecuting Game Schedular");
  mongoose.connect("mongodb://127.0.0.1:27017/playersDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, () => {
    retrieveData((retrievedArray) => {
      const filteredSlotsArray = retrievedArray.filter(slot => slot.status === 'NS');
      const schedule = ScheduleGamesFor(filteredSlotsArray);
      // console.log(schedule);
      // insertScheduledGames(schedule);
    });
  });
}

ScheduleGames()