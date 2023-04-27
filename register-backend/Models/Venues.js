import mongoose,{Schema} from "mongoose";

const venueSchema = new mongoose.Schema({
    venuefr : String,
    email : String
})

export const Venue = mongoose.model('venue', venueSchema);