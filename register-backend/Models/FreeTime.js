import mongoose, {Schema} from "mongoose"


const slotSchema = new mongoose.Schema({
    from : String,
    till : String,
    venuefr: String
})
const freeTimeSchema = new mongoose.Schema({
    game : String,
    email: String,
    slot : [slotSchema]
    
},{
    timeseries : true
})

export const FreeTime  = mongoose.model('freeTime', freeTimeSchema);
