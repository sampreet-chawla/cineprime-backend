# cineprime-backend
cineprime-backend is a "cineprime" web applications's backend repo. It is a MERN group project for GA-Unit3 project  It will be created in Express and Mongoose and will use MongoDB (in MongoDB Atlas cluster) as database.

Squad-Lead: Alex Merced

Team Members: Bojan Josilo, Gourav Auluck, Sampreet Chawla, and Shayan Gagan. Sampreet Chawla is the Tech Lead and Git Master.


| Method                                                   | Route                       |                       Purpose                        |
| -------------------------------------------------------- | --------------------------- | :--------------------------------------------------: |
| GET                                                      | /watchList                  |    Get All Movies in the List(watched and queued)    |
| GET                                                      | /watchlist/watched          |     Get all movies with status "watched" listing     |
| GET                                                      | /watchlist/wantToWatch      |      Get all movies with status "want to watch"      |
| GET                                                      | /watchlist/sort-planned-asc  |         Sort by plan date in ascending order         |
| GET                                                      | /watchlist/sort-planned-desc |        sort by Plan date in descending order         |
| POST                                                     | /watchlist                  |               Add a movie to watchlist               |
| POST                                                     | /watchList/planDate/:id     | Add a movie plan date for the movie with specific id |
| PUT                                                      | /watchList/watchDate/:id    |   Update watchDate for the movie with specific id    |
| PUT                                                      | /watchlist/watchOrder       | Update watchOrder for the the list of planned movies |
| DELETE                                                   | /watchlist/id               |        Delete movie from watchlist scratch!?         |
| GET                                                      | /users                      |            Get all users - for debugging             |
| POST                                                     | /users                      |                  Add user / signup                   |
| <span style="background-color: #ffff00">GET / PUT</span> | /users/validate             |          Validate user on Sign In scratch!?          |






