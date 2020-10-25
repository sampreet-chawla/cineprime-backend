require('dotenv').config();
const API_KEY = process.env.API_KEY;
const axios = require('axios');
const Movie = require('../models/movie');
const router = require('express').Router();
const MovieUtils = require('./movieUtils');

// Add a movie for the specified movie id for a given user name
// Example - POST localhost:4501/api/movies/user/testCDE/635302
router.post('/user/:user/:movieId', async (req, res) => {
	const userName = req.params.user;
	console.log('movieId : ', req.params.movieId);
	// Sample movie id - 635302
	try {
		// Calculate the display order
		let displayOrder = 1;
		await Movie.find({ user: userName, watchStatus: false })
			.sort({ displayOrder: -1 })
			.exec(function (err, docs) {
				if (docs.length > 0) {
					displayOrder = docs.length + 1;
				}
			});

		// Fetch the movie details
		const data = await axios({
			url: `https://api.themoviedb.org/3/movie/${req.params.movieId}?api_key=${API_KEY}`,
		});
		console.log('tmdb data: ', data.data);
		const tmdbMovie = data.data;
		const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w185/';
		const movie = {
			user: userName,
			movieId: tmdbMovie.id,
			title: tmdbMovie.title,
			description: tmdbMovie.overview,
			releaseDate: tmdbMovie.release_date,
			rating: tmdbMovie.vote_average,
			reviewCount: tmdbMovie.vote_count,
			image: IMAGE_BASE_URL + tmdbMovie.poster_path,
			//genres: tmdbMovie.genres,// form a comma separated string
			viewURL: tmdbMovie.homepage,
			runtime: tmdbMovie.runtime,
			displayOrder: displayOrder,
		};
		// Save the movie details
		const newMovie = await Movie.create(movie);
		res.json({ status: 200, data: newMovie });
	} catch (err) {
		res.json({ status: 500, error: err.message });
	}
});

// Get all want to watch movies for the specified user in ascending display order
// GET localhost:4501/api/movies/wantToWatch/user/testCDE
router.get('/wantToWatch/user/:user', async (req, res) => {
	try {
		// Fetch 'want to watch' movies with ascending display order for that user.
		const movies = await Movie.find({
			user: req.params.user,
			watchStatus: false,
		}).sort({
			displayOrder: 1,
		});
		res.json({ status: 200, data: movies });
	} catch (err) {
		res.json({ status: 500, error: err.message });
	}
});

// Add / Update the planned date for a movie
// PUT localhost:4501/api/movies/planDate/2020-10-27/5f9570f76ac4631dd152a895
router.put('/planDate/:planDate/:id', async (req, res) => {
	try {
		const updatedMovie = await Movie.findByIdAndUpdate(
			req.params.id,
			{ datePlanned: req.params.planDate },
			{ new: true }
		);
		res.json({ status: 200, data: updatedMovie });
	} catch (err) {
		res.json({ status: 500, error: err.message });
	}
});

// Add / Update the watch date for a movie
// PUT localhost:4501/api/movies/watchDate/2020-10-27/5f9570f76ac4631dd152a895
router.put('/watchDate/:watchDate/:id', async (req, res) => {
	try {
		const watchDate = new Date(req.params.watchDate);
		const foundMovie = await Movie.findById(req.params.id);
		const planDate = foundMovie.datePlanned;
		let metTargetDate = false;
		console.log(`${planDate} and ${watchDate}, ${watchDate <= planDate}`);
		if (watchDate <= planDate) {
			metTargetDate = true;
		}
		const updatedMovie = await Movie.findByIdAndUpdate(
			req.params.id,
			{
				dateWatched: watchDate,
				metTargetDate: metTargetDate,
				watchStatus: true,
				displayOrder: -1,
			},
			{ new: true }
		);
		res.json({ status: 200, data: updatedMovie });
	} catch (err) {
		res.json({ status: 500, error: err.message });
	}
});

// 
// PUT localhost:4501/api/movies/watchOrder/user/testCDE
router.put('/watchOrder/user/:user', async(req, res) => {
	try {
		const movies = MovieUtils.sortByFieldNumber(req.body, 'displayOrder');
		const updatedMovies = await movies.map(async (movie, index) => {
			return (updateMovie = await Movie.findByIdAndUpdate(
				movie._id,
				{ displayOrder: index + 1 },
				{ new: true }
			));
		});
		console.log('updatedMovies : ', updatedMovies);
		res.json({ status: 200, msg: "Success" });
	} catch (err) {
		res.json({ status: 500, error: err.message });
	}
});

module.exports = router;
