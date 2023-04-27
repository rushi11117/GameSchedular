import mongoose, {Schema} from "mongoose"

const resultSchema = new mongoose.Schema({
    winner : String, //To be set as **Tied if scores equal
    fulltime : String,
    note : String
})
const scheduledGameSchema = new mongoose.Schema({
    player1 : String,
    player2 : String,
    time : String,
    duration : String,
    isCompleated : Boolean,
    result : resultSchema

}, {
    timestamps : true
})

export const FreeTime  = mongoose.model('scheduledGame', scheduledGameSchema);
