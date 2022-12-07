import mongoose from "mongoose";
import { autoresSchema } from "./autores.js";

export const messagesCollectionName = "messages";

export const messagesSchema = new mongoose.Schema({
    autor: { type: autoresSchema, required: true },
    text: { type: String, required: true },
});

export const MessagesModel = mongoose.model(messagesCollectionName, messagesSchema);