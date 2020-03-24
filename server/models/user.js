const mongoose = require('mongoose');
const { Schema } = mongoose;

var userSchema = new Schema({
	email:  { type: String, index: true, unique: true},
	uuid: String,
	name: String,
	signup_date: { type: Date, default: Date.now },
	description: String,
	isRegistered: {type: Boolean, default: false},
	lang: String,
	category: String,
	type: String
});

module.exports = mongoose.model('User', userSchema);
