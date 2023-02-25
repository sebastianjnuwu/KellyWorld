import { Schema, model } from 'mongoose';

export default model(
    'Ticket',
    new Schema({
        id: {
            type: String,
        },
        channel: {
            type: String,
        },
        guild: {
            type: String,
        },
    }),
);
