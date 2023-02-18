import { Schema, model } from 'mongoose';

export default model('Guilds',
 new Schema({
  _id: { type: String },
  invite: { type: Boolean, default: false },
  prefix: { type: String, default: '&' },
  lang: { type: Number, default: 1 },
}));