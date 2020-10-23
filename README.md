# cineprime-backend
cineprime-backend is a "cineprime" web applications's backend repo. It is a MERN group project for GA-Unit3 project  It will be created in Express and Mongoose and will use MongoDB (in MongoDB Atlas cluster) as database.

Squad-Lead: Alex Merced

Team Members: Bojan Josilo, Gourav Auluck, Sampreet Chawla, and Shayan Gagan. Sampreet Chawla is the Tech Lead and Git Master.


| Method        | Route                        |                       Purpose                        |
| ------------- | ---------------------------- | :--------------------------------------------------: |
| GET           | /watchList                   |    Get All Movies in the List(watched and queued)    |
| GET           | /watchlist/watched           |     Get all movies with status "watched" listing     |
| GET           | /watchlist/wantToWatch       |      Get all movies with status "want to watch"      |
| GET           | /watchlist/sort-planned-asc  |         Sort by plan date in ascending order         |
| GET           | /watchlist/sort-planned-desc |        sort by Plan date in descending order         |
| POST          | /watchlist                   |               Add a movie to watchlist               |
| POST          | /watchList/planDate/:id      | Add a movie plan date for the movie with specific id |
| PUT           | /watchList/watchDate/:id     |   Update watchDate for the movie with specific id    |
| PUT           | /watchlist/watchOrder        | Update watchOrder for the the list of planned movies |
| DELETE        | /watchlist/id                |        Delete movie from watchlist scratch!?         |
| GET           | /users                       |            Get all users - for debugging             |
| POST          | /users                       |                  Add user / signup                   |
| **GET / PUT** | /users/validate              |               Validate user on Sign In               |



| As a user, I would love to take a look at movies library, browse the movies and if I find what I like, I can easily add it to my watchlist and track it | Welcomes the user with the displayed row of the movies and offers account creation to keep track of his profile |                                                  Stores the user data and keeps track of his progress                                                  |
| As a user I want to make an account                                                                                                                     | Offers the sign-up, accout creation to become the part of community                                             |                                             Processes user's data and stores it for further authentication                                             |
| I want to browse and create my personal watch list                                                                                                      | Offers a list of available movies with an option to store them in your personal tracker                         | Makes sure to keep track if you've already seen the movie, or if you want to watch it, as well as list of all the movies user has added to the profile |
| I watched a lot of movies that are getting outdated now and I am no longer interested in                                                                | Provides neat features where user can move things around.                                                       |                                                         Updates, clears and saves the changes                                                          |
| I want to start from the begginning. I am no longer interested in sci-fi                                                                                | Clear button!?                                                                                                  |                                                      Provides the fresh watchlist, from scratch.                                                       |
| 


