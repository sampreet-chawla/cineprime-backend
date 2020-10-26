const { Schema, model } = require('../db/conn');

const MovieSchema = new Schema({
	user: { type: String, required: true },
	movieId: { type: Number, required: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
	releaseDate: { type: String, default: 'NA' },
	rating: { type: Number, default: 0 },
	reviewCount: { type: Number, default: 0 },
	image: { type: String, required: true },
	viewUrl: { type: String },
	runtime: { type: Number, default: 0 },
	dateAdded: { type: Date, default: Date.now() },
	datePlanned: { type: Date },
	dateWatched: { type: Date },
	displayOrder: { type: Number, default: 0 },
	watchStatus: { type: Boolean, default: false },
	metTargetDate: { type: Boolean, default: false },
});

const Movie = model('Movie', MovieSchema);

module.exports = Movie;
