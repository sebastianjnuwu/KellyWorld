import pkg from 'mongoose';
const { Schema, model } = pkg;

export default model('Users', new Schema({
  _id: { type: String, default: null },
  economy: {
    kethereum: { type: Number, default: 0 },
    kerein: { type: Number, default: 0 },
  },
  cooldowns: { 
    work: { type: String, default: 0 },
    daily: { type: String, default: 0 },
  }
}));