# MyMovieList

## Overview
- A clean and clutter free movie application engraved with all the features of a traditional movie app like IMDb alongside having ability to add friends and customize watchlists for better personalization and user engagement.
- Created the app in a team of developers as a part of my academic project.

### [**Client-Side UI working Video**](https://drive.google.com/file/d/1ZrjJfTw-PD4b0fZ7DBuoVh39D5QQNNmu/view?usp=share_link) <-- Click Here
### Attributions:
-TMDB API: used for home page. Link- [documentation](https://www.themoviedb.org/documentation/api)

-Contacts: used for structure of the serverside app, which was provided by the prof.
## Steps To load the database:

1. Go to following link: [bganesh_prathams_dataset](https://mega.nz/folder/OuxxgIjK#YJWEiRX51w_R92o257CqnA) and download the datasets file and unzip it into your server file.
2. `cd server` to go into server and then do `cd bganesh_prathams_dataset`.
3. Run the following command to get the data into your local mongodb database:
- `mongoimport --db=IMDb --type=tsv --headerline --collection=title.basics title.basics.tsv`
- `mongoimport --db=IMDb --type=tsv --headerline --collection=title.ratings title.ratings.tsv`

## Steps to run the server:
1. Make sure you are in the server folder, if not do `cd server`. Then run the following command: `npm install` to install all the dependencies.
2. Now to run the server, run the command in the terminal: `npm run devStart`.

## Steps to run the tests:
1. Open a new terminal then `cd server`.
2. Now run the commands provided in the `documentation.md` to test all features.
 
### In a seperate Terminal

## Steps to run the client:
1. Make sure you are in the MyMovieList folder, if not do `cd client` then `cd MyMovieList`. Then run the following command: `npm install` to install all the dependencies.
2. Now to run the client, run the command in the terminal: `npm run dev`.

### Note: remember to do `npm install` in both server and client
*While using search please wait for few seconds as it takes time, due to the large database*
