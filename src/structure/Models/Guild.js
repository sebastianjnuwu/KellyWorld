import { Schema, model } from 'mongoose';

export default model(
	'Guilds',
	new Schema({
		_id: { type: String },
		invite: { default: false, type: Boolean },
		lang: { default: 1, type: Number },
		prefix: { default: '&', type: String },
	}),
);
