import mongoose from 'mongoose';
import { retrieveData } from '../retrive.cjs';
import { Slot } from "../index.js"

const Schema = mongoose.Schema;

export const ScheduledGamesSchema = new mongoose.Schema({
  player1: String,
  player2: String,
  startTime: String,
  game: String,
  result: {
    type: Array,
    default: ["not yet added"],
  },
});

const ScheduledGame = new mongoose.model("ScheduledGame", ScheduledGamesSchema);


//not being use
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


async function insertScheduledGames(player1, player2, startTime, game) {
  const result = [];
  const tmpSchedule = new ScheduledGame({
    player1,
    player2,
    startTime,
    game,
    result
  })

  console.log(player2);
  tmpSchedule.save(err => {
    if (err) {
      console.log("error sving schedule:", err);
    } else {
      console.log("scheduled updated");
    }
  })
}


function changeStatusInCollection(slot_id) {
  Slot.findByIdAndUpdate(slot_id, { status: 'S' })
    .then((updatedSlot) => {
      console.log('Updated User:', updatedSlot);
    })
    .catch((error) => {
      console.error('Error updating user:', error);
    });
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
        changeStatusInCollection(currentPlayer._id);
        changeStatusInCollection(slots[j]._id);
        const startTime = currentPlayer.from;
        const player1 = currentPlayer.email;
        const player2 = slots[j].email;
        const game = slots[j].game;
        insertScheduledGames(player1, player2, startTime, game)
      }
    }
  }
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