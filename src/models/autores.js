import mongoose from "mongoose";

export const autoresCollectionName = "autores";

export const autoresSchema = new mongoose.Schema({
    id: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: String, required: true },
    alias: { type: String, required: true },
    avatar: { type: URL, required: true },
});

export const ProductsModel = mongoose.model(autoresCollectionName, autoresSchema);