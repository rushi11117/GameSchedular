import { Game } from "../index.js";
import {MongoClient} from "mongodb";


export function CancelGame(game_id,email) {
    Game.findAndDelete
}

CancelGame()