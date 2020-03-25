const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
	email:  { type: String, index: true, unique: true},
	uuid: String,
	name: String,
	center: String,
	signup_date: { type: Date, default: Date.now },
	description: String,
	lang: String,
	category: String,
	placeId: Number,
	type: String,
	phone: String,
	code: String,
	password: { type: String, default: null, required: false },
	
	masks: Number,
	visors: Number,
	respirators: Number,
	epis: Number,
	hidrocloroquine: Number,
	stretchers: Number,
	money: Number,
	printer: Number 
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
