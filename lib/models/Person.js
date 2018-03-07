const mongoose = require('mongoose');

const PersonSchame = new mongoose.Schema({
	index: Number,
	guid: String,
	isActive: Boolean,
	balance: String,
	picture: String,
	age: Number,
	eyeColor: String,
	name: String,
	gender: String,
	company: String,
	email: String,
	phone: String,
	address: String,
	about: String,
	registered: String,
	latitude: String,
	longitude: String,
	tags: [String],
	friends: Array,
    greeting: String,
    favoriteFruit: String
});

const Person = mongoose.model('Person', PersonSchame);

module.exports = Person;
