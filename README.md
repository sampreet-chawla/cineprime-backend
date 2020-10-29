# cineprime-backend
cineprime-backend is a "cineprime" web applications's backend repo. It is a MERN group project for GA-Unit3 project  It will be created in Express and Mongoose and will use MongoDB (in MongoDB Atlas cluster) as database.

Squad-Lead: Alex Merced

Team Members: Bojan Josilo, Gourav Auluck, Sampreet Chawla, and Shayan Gagan. Sampreet Chawla is the Tech Lead and Git Master.

## Router Table

With BASE_URL as https://cineprime-backend.herokuapp.com

| Method        | Route                                   |                       Purpose                                    | 
| ------------- | --------------------------------------- | :--------------------------------------------------------------: |
| GET           | /api/movies/all/user/:user              | Get All Movies in the List(watched and want-to-watch) for the specified user name |
| GET           | /api/movies/watched/user/:user          | Get all movies with status "watched" for the specified user name |
| GET           | /api/movies/wantToWatch/user/:user      | Get all movies with status "want to watch"  for the specified user name in ascending display order - under test |
| POST          | /api/movies/user/:user/:movieId         | Add the specified movie (movieId) to the end of user's watchlist for the specified user name  |
| PUT           | /api/movies/planDate/:planDate/:id      | Add / Update the planned date for a movie with specified movie's ObjectId, Plan-date format "2020-10-27" | 
| PUT           | /api/movies/watchDate/:watchDate/:id    | Adds watched date for a movie with specified movie's ObjectId, Watched-date format "2020-10-27". For more, refer$$|
| PUT           | /api/movies/saveDates/:id               | Adds either datePlanned or both datePlanned and dateWatched for a movie's ObjectId, dates in request body |
| PUT           | /api/movies/watchOrder/user/:user       | Updates the watchOrder for the the list of planned moviessent is request body for the specified user name |
| DELETE        | /api/movies/user/:user                  | Delete all movie for the specified user name   |
| DELETE        | /api/movies/id/:id                      | Delete movie specified by movie's Object id |
| POST          | /auth/signup                            | Add user / signup    |
| POST          | /auth/login                             | Validate user on Sign-In the user, Return token on successful validation |

$$  While adding watchDate, watch status is set to true, metTargetDate is set to true or false if watched date is before or on the planned date, i.e. target is met.

## Schema

### Movie Schema 

```
const MovieSchema = new Schema({
	user: { type: String, required: true },
	movieId: { type: Number, required: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
	releaseDate: { type: String, default: 'NA' },
	rating: { type: Number, default: 0 },
	reviewCount: { type: Number, default: 0 },
	image: { type: String, required: true }
	viewURL: { type: String, required: true },
	runtime: { type: Number, default: 0 },
	dateAdded: { type: Date, default: Date.now() },
	datePlanned: { type: Date },
	dateWatched: { type: Date },
	displayOrder: { type: Number, default: 0 },
	watchStatus: { type: Boolean, default: false },
	metTargetDate: { type: Boolean, default: false },
});
```




