import { MessagesModel } from "../models/messages.js";
import { normalize, denormalize, shema, schema } from "normalizr";

const autor = new schema.Entity("autor", {}, { idAttribute: "id" });
const msg = new schema.Entity(
    "message",
    { autor: autor },
    { idAttribute: "_id" }
);

const msgsSchema = new schema.Array(msg);

export const AllMessages = async (request, response) => {
    try {
        const Messages = await MessagesModel.find().lean();

        if (!Messages) {
            return response.status(400).json({
                mensaje: "No hay mensajes para mostrar",
            });
        } else {
            return response.status(200).json({
                data: Messages,
            });
        }
    } catch (error) {
        response.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

export const NormalizedMessages = async (request, response) => {
    try {
        const messagesOriginalData = await MessagesModel.find().lean();

        let normalizedMessages = normalize(messagesOriginalData, msgsSchema);

        return response.status(200).json({
            data: normalizedMessages,
        });
    } catch (error) {
        response.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};

export const DenormalizedMessages = async ( request, response) => {
    try {
        const messagesOriginalData = await MessagesModel.find().lean();

        let normalizedMessages = normalize(messagesOriginalData, msgsSchema);

        const denormalizedData = denormalize(
            normalizedMessages.result,
            msgsSchema,
            normalizedMessages.entities
        );

        return response.status(200).json({
            data: denormalizedData,
        });
    } catch (error) {
        response.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};