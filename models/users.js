const { Schema, model } = require('../db/connection');

const UserSchema = new Schema({
	userName: { type: String, required: true },
	password: { type: String, required: true },
});

const User = model('User', UserSchema);

//export model
module.exports = User;
