import mongoose from "mongoose";
import { Slot } from "../index.js";


export function ReflectChanges(slots_id,email) {
    Slot.findByIdAndUpdate(slots_id[0], { status: 'CSL' }, { new: true })
        .then((updatedSlot) => {
            console.log('Updated User:', updatedSlot);
        })
        .catch((error) => {
            console.error('Error updating user:', error);
        });


    Slot.findByIdAndUpdate(slots_id[1], { status: 'CSL' }, { new: true })
        .then((updatedSlot) => {
            console.log('Updated User:', updatedSlot);
        })
        .catch((error) => {
            console.error('Error updating user:', error);
        });
}
