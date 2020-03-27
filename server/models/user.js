const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
	code: String,
	type: String,
	category: { type: String, default: 'other' },

	// general
	signup_date: { type: Date, default: Date.now },
	description: String,
	lang: String,
	password: { type: String, default: null, required: false },

	// contact
	name: String,
	center: String,
	placeId: String,
	phone: String,
	address: String,
	email:  { type: String },
	
	// flags
	for_listing: { type: Boolean, default: true },
	known_state: { type: Boolean, default: false },

	// products
	masks: { type: Number, default: 0 },
	visors: { type: Number, default: 0 },
	coats: { type: Number, default: 0 },
	respirators: { type: Number, default: 0 },
	epis: { type: Number, default: 0 },
	stretchers: { type: Number, default: 0 },
	hidrocloroquine: { type: Number, default: 0 },
	azithromycin: { type: Number, default: 0 },

	// products donor
	money: Number,
	printer: Number,

	// activity
	history: Array,
});

// UserSchema.pre('save', function(next) {
//     var user = this;

//     // only hash the password if it has been modified (or is new)
//     if (!user.isModified('password')) return next();

//     // generate a salt
//     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//         if (err) return next(err);

//         // hash the password using our new salt
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             if (err) return next(err);

//             // override the cleartext password with the hashed one
//             user.password = hash;
//             next();
//         });
//     });
// });

// UserSchema.methods.comparePassword = function(candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };

module.exports = mongoose.model('User', UserSchema);
