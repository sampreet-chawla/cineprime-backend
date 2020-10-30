require('dotenv').config();
const API_KEY = process.env.API_KEY;
const axios = require('axios');
const Movie = require('../models/movie');
const router = require('express').Router();
const MovieUtils = require('./movieUtils');

// Add a movie for the specified movie id for a given user name
// Example - POST localhost:4501/api/movies/user/testCDE/635302
// Sample tmdbId / movieId - 635302, 724989, 337401, 694919, 539885
router.post('/user/:user/:movieId', async (req, res) => {
	const username = req.params.user;
	try {
		// Calculate the display order
		let displayOrder = 1;
		await Movie.find({ username: username, watchStatus: false })
			.sort({ displayOrder: -1 })
			.exec(function (err, docs) {
				if (docs.length > 0) {
					displayOrder = docs.length + 1;
				}
			});

		// Fetch the movie details
		// const data = await axios({
		// 	url: `https://api.themoviedb.org/3/movie/${req.params.movieId}?api_key=${API_KEY}`,
		// });
		// const tmdbMovie = data.data;
		const tmdbMovie = req.body;
		console.log('tmdbMovie from req.body: ', tmdbMovie);
		const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w185/';
		const movie = {
			username: username,
			movieId: tmdbMovie.id,
			title: tmdbMovie.name,
			description: tmdbMovie.overview,
			releaseDate: tmdbMovie.first_air_date,
			rating: tmdbMovie.vote_average,
			reviewCount: tmdbMovie.vote_count,
			image: IMAGE_BASE_URL + tmdbMovie.poster_path,
			viewUrl: '',
			runtime: 0,
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
			username: req.params.user,
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

// Add / Update the plan date and watch date for a movie
//PUT localhost:4501/api/movies/saveDates/5f9570f76ac4631dd152a895
// Can give either "datePlanned" or both "datePlanned" and "dateWatched"
/* req.body - 
	{
		"datePlanned": "2020-10-26",
		"dateWatched": "2020-10-26"
	}
*/
router.put('/saveDates/:id', async (req, res) => {
	try {
		const datePlanned = req.body.datePlanned;
		const dateWatched = req.body.dateWatched;
		let updatedMovie;
		if (dateWatched === null) {
			updatedMovie = await Movie.findByIdAndUpdate(
				req.params.id,
				{ datePlanned: datePlanned },
				{ new: true }
			);
		} else {
			const watchDate = new Date(dateWatched);
			const planDate = new Date(datePlanned);
			let metTargetDate = false;
			if (watchDate <= planDate) {
				metTargetDate = true;
			}
			updatedMovie = await Movie.findByIdAndUpdate(
				req.params.id,
				{
					datePlanned: planDate,
					dateWatched: watchDate,
					metTargetDate: metTargetDate,
					watchStatus: true,
					displayOrder: -1,
				},
				{ new: true }
			);
		}
		res.json({ status: 200, data: updatedMovie });
	} catch (err) {
		res.json({ status: 500, error: err.message });
	}
});

// Saves the specified watch order for all the movies in the request body for the specified user name.
// PUT localhost:4501/api/movies/watchOrder/user/testCDE
router.put('/watchOrder/user/:user', async (req, res) => {
	try {
		const movies = MovieUtils.sortByFieldNumber(req.body, 'displayOrder');
		const updatedMovies = await movies.map(async (movie, index) => {
			return (updateMovie = await Movie.findByIdAndUpdate(
				movie._id,
				{ displayOrder: index + 1 },
				{ new: true }
			));
		});
		res.json({ status: 200, msg: 'Success' });
	} catch (err) {
		res.json({ status: 500, error: err.message });
	}
});

// GET	/api/movies/all/user/:user	Get All Movies in the List(watched and want-to-watch) for the specified user name - TBD
router.get('/all/user/:user', async (req, res) => {
	try {
		const movies = await Movie.find({
			username: req.params.user,
		});
		res.json({ status: 200, data: movies });
	} catch (err) {
		res.json({ status: 500, error: err.message });
	}
});

// GET	/api/movies/watched/user/:user	Get all movies with status "watched" for the specified user name - TBD
router.get('/watched/user/:user', async (req, res) => {
	try {
		const movies = await Movie.find({
			username: req.params.user,
			watchStatus: true,
		});
		res.json({ status: 200, data: movies });
	} catch (err) {
		res.json({ status: 500, error: err.message });
	}
});

// DELETE	/api/movies/id/:id	Delete movie specified by movie's Object id - TBD
//delete route
router.delete('/id/:id', async (req, res) => {
	try {
		await Movie.findByIdAndRemove(req.params.id);
		res.json({ status: 200, msg: `Movie with ID ${req.params.id} deleted.` });
	} catch (err) {
		res.json({ status: 500, error: err.message });
	}
});

// DELETE	/api/movies/user/:user	Delete all movie for the specified user name - TBD
router.delete('/user/:user', async (req, res) => {
	try {
		await Movie.deleteMany({ username: req.params.user });
		res.json({
			status: 200,
			msg: `Movie list for user ${req.params.user} is cleared.`,
		});
	} catch (err) {
		res.json({ status: 500, error: err.message });
	}
});

module.exports = router;
