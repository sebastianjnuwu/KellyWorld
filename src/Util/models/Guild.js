import pkg from 'mongoose';
const { Schema, model } = pkg;

export default model('Guilds', new Schema({
 _id: { type: String },
 antiinvite: { type: Boolean, default: false },
 prefix: { type: String, default: '&' },
 lang: { type: Number, default: 1 }
}));