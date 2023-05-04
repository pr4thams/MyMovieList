# MyMovieList Documentation

## **Server Side**

## Feature 1: **User Login & Logout**
----
### **Description**
User Login is a feature to login in the user to provide access to them for the website.
### **Implementation Strategy**
We are using user email and password to authenticate and generate a web token for the user to access the website. 
- We are using **jwt** to generate the user token. 
- **dotenv** to configure the JWT_secret key to encrypt the token. 
- **mongoose** as middleware to fetch user data and create new user data.
### **Dependencies**
The Login is dependent upon the Register feature to happen.
### **Implementation Status**
The server side of the feature is currently complete and working.
### **Testing**
We have used a singular mocha test file to test the implementation of the register, login, logout and delete user implementations. To run the file type the following command in terminal: `npm test .\test\mocha-auth.js`.

Heres what the test file does: 
- It Registers a new user.
- Tests whether the user trying to register is already in the database.
- It logs in the newly create user.
- It validates the credentials user has entered and throws error if password entered is incorrect.
- It logs out the user which was recently logged in.
- It deletes the user which was created in the beginning.

## Feature 2: **Register**
---
### **Description**
The Register feature allows new users to create an account by providing their personal information.
### **Implementation Strategy**
The Register feature is implemented using Node.js and Express.js. The register function in the registerController.js file creates a new User instance with the provided information, checks if a user with the same email already exists, and then saves the user to the database. The User model is defined in the userModel.js file. This feature also uses the assert module for testing.
### **Dependencies**
This feature depends on the User model defined in the userModel.js file.
### **Implementation Status**
The Register feature is fully implemented and working.
### **Testing**
We have used the same mocha test file to test the implementation of the register, login, logout and delete user implementations. To run the file type the following command in terminal: `npm test .\test\mocha-auth.js`

The test code for register does the following: This test code sends a POST request to the /register endpoint with user data in the request body. The test checks that the response status is 201, the response data has a message property, and the value of the message property is 'User registered successfully'. The console will also log the response data.

## Feature 3: **Watchlist**
-----
### **Description**
The watchlist feature allows a user to add movies to a list of titles they want to watch later. A watchlist item consists of a movie ID, the user's email address, the movie's primary title, the user's rating for the movie, and the status of the item (watched or not watched).
### **Implementation Strategy**
The watchlist feature is implemented using an object model defined in the watchlist.js file. The model is used to create new watchlist items, find existing items in the list, and delete items from the list. The feature is implemented using the following tools and imported packages:
- `watchlistObj` model for interacting with the MongoDB database
- `express` framework for building the RESTful API
- `mongoose` package for creating models and interacting with the MongoDB database
### **Dependencies**
The 
### **Implementation Status**
The watchlist feature is complete and fully functional.
### **Testing**
The following test cases were implemented to test the watchlist feature:

- Add a movie to the watchlist: Sends a POST request to /watchlist with a valid request body, and expects a 201 response with the message "Item Added" and the updated watchlist object.
- Attempt to add a movie that already exists in the watchlist: Sends a POST request to /watchlist with a request body for a movie that already exists in the watchlist, and expects a 200 response with the message "Title already in watchlist".
- Get the watchlist for a user: Sends a GET request to /watchlist/:email with a valid email parameter, and expects a 200 response with an array of objects representing the movies in the user's watchlist.
- Remove a movie from the watchlist: Sends a DELETE request to /watchlist/:movieId with a valid movieId parameter, and expects a 200 response with the message "Movie Deleted!".
- Attempt to remove a movie that does not exist in the watchlist: Sends a DELETE request to /watchlist/:movieId with a movieId parameter for a movie that does not exist in the watchlist, and expects a 201 response with the message "Title not found in watchlist".
 
To run the mocha test for watchlists run this command in your terminal: `npm test .\test\mocha-watchlist.js`

## Feature 4: **Recently Viewed**
-----
### **Description**
This feature displays a list of recently viewed movie titles for a given user. It depends on the "Search" feature, as it stores the recently viewed movie titles by the user in the database.
### **Implementation Strategy**
The feature is implemented in the *getRecentlyViewed* function of the controller file. The function queries the database for the most recent documents for each movieId associated with the email provided, sorts the results by *searchTime* in descending order, skips documents based on the pageNum parameter, and limits the results to PAGE_SIZE number of documents. Then, it queries the title_basics collection to get the primaryTitle for each movieId and sends the list of recently viewed movie titles as the response.
### **Dependencies**
This feature depends on the "Search" feature, as it stores the recently viewed movie titles by the user in the recentlyViewed collection of the database.
### **Implementation Status**
The feature is complete and working.
### **Testing**
The test code sends a GET request to the Recently Viewed endpoint with a valid email parameter and verifies that the status code of the response is 200 and the length of the results array is 10 (since the default page size is 10). Additional tests can be added to verify the correctness of the results. The test code is working properly and the marker should see a passing result upon running it.

To run the test file for recently viewed: `npm test .\test\mocha-recent.js`

## Feature 5: **Search**
-----
### **Description**
The search feature allows users to search for movie titles by title and adds the searched title to the recently viewed collection.
### **Implementation Strategy**
The searchTitle function uses the findOne method of the title_basics model to search for the movie title by the provided keyword. If the movie title is found, it is added to the recently viewed collection by creating a new instance of the recentlyViewed model and saving it to the database using the save method. The searchTitles function uses the find method to search for all movie titles matching the provided keyword.
### **Dependencies**
The search feature uses the title_basics and recentlyViewed models.
### **Implementation Status**
The search feature implementation is complete and fully functional.
### **Testing**
To test the Search feature, we have used the Mocha test framework along with the Axios library for making HTTP requests. We have written three test cases to test the feature's functionality:
- The first test case checks whether the searchTitle controller returns an object with search results or not.
- The second test case verifies that the searchTitles controller returns all the movies that match the primary title.
- The third test case checks whether the controller returns an error message when no movies are found.

All the test cases are working properly and can be executed using the command: `npm test .\test\mocha-search.js`

## Feature 6: **Ratings**
-----
### **Description**
The Ratings feature allows users to rate titles on their watchlist and view statistics about ratings for a particular title.
### **Implementation Strategy**
The Ratings feature is implemented using three API endpoints:
- `addUpdateRating`: This endpoint allows a user to add or update a rating for a title on their watchlist. It first checks if the title is in the watchlist, and if so, updates the user's rating. It then returns the updated watchlist.
- `getUserRatings`: This endpoint allows a user to view all their ratings for titles on their watchlist. It takes the user's email as a parameter and returns an array of objects containing the user's ratings, along with the primary title and movie ID.
- `ratingStatistics`: This endpoint allows users to view rating statistics for a particular title. It takes the movie ID (tconst) as a parameter and returns the average rating and number of votes for that title.
### **Dependencies**
The Ratings feature depends on the Watchlist feature, as it uses the 'watchlistObj' model to find and update titles on the watchlist.
### **Implementation Status**
The Ratings feature is complete and functional.
### **Testing**
To test the Ratings feature, a Mocha test file has been provided with two test cases:
1. `add_rating()`: This test case checks if ratings can be added successfully to titles on the watchlist. It sends HTTP POST requests to the addUpdateRating endpoint with test data and checks if the response status is 200.
2. `getStats()`: This test case checks if rating statistics can be retrieved successfully for a particular title. It sends an HTTP GET request to the ratingStatistics endpoint with test data and checks if the response status is 200.

To run the test code, navigate to the root directory of the project and run the command `npm test .\test\mocha-rating.js`. The tests should run successfully, and the console should display the data returned from the endpoints.

## Feature 7: **User-List**
-----
### **Description**
The userList feature is designed to allow registered users to create a list of movie titles they want to watch.
### **Implementation Strategy**
The userList controller function retrieves the { email, tconst, and titles } fields from the request body using the req.body object. The function then finds the user document with the matching email field and updates the userList field with the new movie title using the $push operator. If the update is successful, the function sends the updated user document back as a response with status code 200. If there is an error, the function logs the error and sends a response with status code 500.
### **Dependencies**
The userList feature depends on the User model from "../models/user.js" and the MongoDB database.
### **Implementation Status**
User-List requires some more implementation, it will be updated when client side is created.
### **Testing**
The test file uses Mocha to perform the tests. The test file first sets up an Axios instance with the appropriate headers and base URL. Then it defines a test case that creates a new user with the provided email, tconst, and titles, using the '/register' endpoint, and then adds the new title to the user's list using the '/UserList' endpoint. The test case then asserts that the response status is 200 and that the new title has been added to the user's list correctly. Finally, the test case deletes the user from the database using the '/users' endpoint.

The file for testing can be run by: `npm test .\test\mocha-userList.js`

## Feature 8: **Friends**
-----
### **Description**

The Friends feature is designed to allow registered users to add and remove friends from their friend list, as well as retrieve a list of all their friends.

### **Implementation Strategy**

#### **Add Friend**

The `addFriend` controller function retrieves the `email` and `friendEmail` fields from the request parameters and body using `req.params` and `req.body`, respectively. The function then finds the user document with the matching `email` field and the friend document with the matching `friendEmail` field using `User.findOne()`. If the friend is not found, the function sends a response with status code 404 and a message "Friend not found". If the user has already added the friend, the function sends a response with status code 400 and a message "Friend already added". If the friend is found and not already added by the user, the function adds the friend to the user's `friends` array using `Array.push()` and saves the user document using `user.save()`. Finally, the function sends the updated user document back as a response with status code 200.

#### **Remove Friend**

The `removeFriend` controller function retrieves the `email` and `friendEmail` fields from the request parameters and body using `req.params` and `req.body`, respectively. The function then finds the user document with the matching `email` field and the friend document with the matching `friendEmail` field using `User.findOne()`. If the friend is not found, the function sends a response with status code 404 and a message "Friend not found". If the friend is found and is in the user's `friends` array, the function removes the friend from the user's `friends` array using `Array.filter()` and saves the user document using `user.save()`. Finally, the function sends the updated user document back as a response with status code 200.

#### **Get Friends**

The `getFriends` controller function retrieves the `email` field from the request parameters using `req.params`. The function then finds the user document with the matching `email` field using `User.findOne()` and populates the `friends` field using `.populate('friends')`. Finally, the function sends the populated `friends` array back as a response with status code 200.

### **Dependencies**

The Friends feature depends on the User model from `"../models/users.js"` and the MongoDB database.

# **Client Side**

## Feature 8:**Home Page**
------

The home page is the first page that users see when they log into the Movie Tracker app. It includes the following features:

- A header navigation component that displays links to other pages in the app.
- An alert message that displays if the user is not logged in.
- A container that displays a welcome message to the user, along with information about the app's features.
- Three MovieList components that display movies based on different criteria (popular, top rated, upcoming).

The code for the Home page can be found in the `Home.js` file in the `src/pages/home` directory.

### **Search**

The search feature allows users to search for movies in the Movie Tracker database. It includes the following features:

- A search bar component that allows users to enter a search term.
- A search button component that initiates the search.
- A search results component that displays the results of the search.
- A clear button component that clears the search results and search bar.

The code for the Search feature can be found in the `Search.js` file in the `src/pages/search` directory.

### **Watchlist**

The watchlist feature allows users to add movies to their watchlist, view their watchlist, and remove movies from their watchlist. It includes the following features:

- A watchlist button component that toggles the display of the user's watchlist.
- A watchlist component that displays the user's watchlist, including movie posters and information.
- An add to watchlist button component that adds a movie to the user's watchlist.
- A remove from watchlist button component that removes a movie from the user's watchlist.

The code for the Watchlist feature can be found in the `Watchlist.js` file in the `src/pages/watchlist` directory.

### **Ratings**

The ratings feature allows users to rate movies they have watched. It includes the following features:

- A ratings button component that toggles the display of the user's rated movies.
- A ratings component that displays the user's rated movies, including movie posters and information.
- A rate movie button component that allows the user to rate a movie.
- An update rating button component that allows the user to update their rating for a movie.
- A delete rating button component that allows the user to delete their rating for a movie.

The code for the Ratings feature can be found in the `Ratings.js` file in the `src/pages/ratings` directory.

### **Discussion**

The discussion feature allows users to discuss movies with other users in the app. It includes the following features:

- A discussion button component that toggles the display of the discussion page.
- A discussion page component that displays the discussion forum.
- A new discussion button component that allows the user to create a new discussion thread.
- A discussion thread component that displays a discussion thread, including the original post and replies.
- A reply button component that allows the user to reply to a discussion thread.

The code for the Discussion feature can be found in the `Discussion.js` file in the `src/pages/discussion` directory.

## Feature 9: **Login Page**
----

The login page allows users to sign in to their account.

### **Header**

The header component appears at the top of the page and includes a navigation menu.

### **Login Form**

The login form includes the following fields:

- Email: Users enter their email address in this field.
- Password: Users enter their password in this field.

Users must fill out both fields in order to log in. If the user has not yet created an account, they can click on the "Create Account" link to be taken to the registration page.

### **Alert**

If the user has recently updated their profile, an alert will appear at the top of the page notifying them that their profile has been updated. The alert can be dismissed by clicking the "X" button.

### **Card**

The login form is contained within a card component, which is styled to have a shadow and a light grey background color.

### **Submit Button**

The "Login" button at the bottom of the form allows users to submit their login information and sign in to their account.

Once the user has successfully logged in, they will be redirected to the home page.

## Feature 10: **Register Page**
----

This component is a client-side feature that allows users to register a new account on the website.

## **Feature Descriptions**
- **Name:** Registration Form (client-side)
- **Description:** This feature allows users to enter their first name, last name, email, and password to create a new account on the website. Upon successful registration, the user will be redirected to the login page.
- **Implementation Strategy:** The registration form is implemented using React and the Bootstrap library. Form fields are controlled components that update state using the useState hook. Upon submission, a POST request is sent to the server-side endpoint /register with the user's input data.
- **Dependencies:** This feature depends on the server-side endpoint /register to handle registration requests and database storage to persist user data.
- **Implementation Status:** This feature is fully implemented and working as intended.

## **Testing**
As this is a client-side feature, testing can be done manually by entering valid and invalid input into the registration form and observing the appropriate responses.

## **User Interface**
Upon accessing the register page, the user will see a registration form with input fields for first name, last name, email, and password. The form is styled using the Bootstrap library and includes a "Register" button for submitting the form. Below the form, there is a link to the login page for users who already have an account.

## Feature 11: **Profile Page**
----
The Profile page displays the user's profile information and their friends list. 

### **Components Used**

- `HeaderNav`: Navigation header component
- `Container`: Bootstrap component for containing the page content
- `Image`: Bootstrap component for displaying images
- `Row`: Bootstrap component for arranging content in rows
- `Col`: Bootstrap component for arranging content in columns
- `Card`: Bootstrap component for displaying content in a card format
- `CardGroup`: Bootstrap component for grouping cards together
- `Button`: Bootstrap component for creating buttons
- `Trash`: React Bootstrap icon for displaying a trash icon

### **Dependencies Used**

- `react-bootstrap`: Used for accessing the Bootstrap components
- `react-redux`: Used for accessing the Redux store
- `react-router-dom`: Used for navigating between pages

### **Code Structure**

- `useSelector`: Hook used to access the `auth` slice of the Redux store
- `useDispatch`: Hook used to dispatch an action to the Redux store
- `useNavigate`: Hook used to navigate to a different page
- `removeFriend`: Function used to remove a friend from the user's friend list
- `Profile`: Functional component that renders the Profile page

## **Implementation**

The `Profile` component is a functional component that retrieves the user's profile information and their friends list from the `auth` slice of the Redux store using the `useSelector` hook. 

The component displays the user's profile information in a `Card` component with a profile picture, name, and joined date. The component also displays the user's bio and their friends list in separate sections. The friends list is displayed using the `CardGroup` component, which groups the `Card` components together.

Each `Card` component in the friends list displays the friend's profile picture, name, email, and bio. It also includes a `Button` component with a trash icon that, when clicked, calls the `removeFriend` function to remove the friend from the user's friend list. 

The `removeFriend` function sends a `DELETE` request to the server with the user's email and the friend's email. If the friend is successfully removed, the `setFriends` action is dispatched to update the `friends` array in the `auth` slice of the Redux store. The `navigate` hook is then used to reload the Profile page.

## Feature 12: **Search Page**
----

The Search page displays a search bar where users can search for other users based on their name or email. The search results are displayed in a list format, with each item showing the user's profile picture, name, and email.

### **Components Used**

- `HeaderNav`: Navigation header component
- `Container`: Bootstrap component for containing the page content
- `Image`: Bootstrap component for displaying images
- `Form`: Bootstrap component for creating forms
- `InputGroup`: Bootstrap component for creating input groups
- `FormControl`: Bootstrap component for creating form inputs
- `Button`: Bootstrap component for creating buttons
- `ListGroup`: Bootstrap component for displaying a list of items
- `ListGroupItem`: Bootstrap component for displaying an item in a list

### **Dependencies Used**

- `react-bootstrap`: Used for accessing the Bootstrap components
- `react-redux`: Used for accessing the Redux store
- `react-router-dom`: Used for navigating between pages

### **Code Structure**

- `useSelector`: Hook used to access the `auth` slice of the Redux store
- `useDispatch`: Hook used to dispatch an action to the Redux store
- `useState`: Hook used to manage the search query state
- `handleSubmit`: Function used to handle the form submission
- `Search`: Functional component that renders the Search page

## **Implementation**

The `Search` component is a functional component that displays a search bar where users can enter a search query. The component retrieves the user's friend list from the `auth` slice of the Redux store using the `useSelector` hook.

When the user submits the form, the `handleSubmit` function is called, which sends a `GET` request to the server with the search query. The server responds with a list of users that match the search query. The search results are then displayed in a `ListGroup` component, with each item displaying the user's profile picture, name, and email.

If the user is already friends with a searched user, the "Add Friend" button is replaced with a "Remove Friend" button. When clicked, the `removeFriend` function is called to remove the friend from the user's friend list.

## **Example Usage**

To use the Search page, the user enters a search query into the search bar and clicks the search button. The search results are displayed below the search bar. If the user wants to add a searched user as a friend, they can click the "Add Friend" button. If the user is already friends with the searched user, they can click the "Remove Friend" button to remove them from their friend list.

## Feature 13: **Settings Page**
----
The settings page allows the user to view and edit their profile information, including their name, email, bio, profile picture, and background image.

### **Implementation:**
The Settings page is a functional React component that uses hooks like useState, useSelector, useDispatch, and useNavigate from 'react-router-dom'. It imports several components from react-bootstrap, including Card, Button, Form, Container, ListGroup, Col, Row, and HeaderNav, which is a custom header component. It also uses the Redux framework, specifically the useSelector and useDispatch hooks, to get and update user information. The component includes four functions, updateUser, updatePictures, updateBackground, and updatePass, which use the fetch API to send user data to the server and update it in the database.

### **Dependencies:**
The Settings page depends on Redux state management, specifically the auth slice, which stores the user's information, including their email, name, bio, and profile and background images.

### **State of Implementation:**
The Settings page is fully implemented and functional. Users can edit their profile information, including their name, email, and bio, and update their profile picture and background image. They can also change their password by entering a new password and confirming it. Once the user updates their information, the page navigates back to the home page.

### **Testing:**
To test the Settings page, the marker can run the application and click on the "Settings" link in the header. The user should see a form with their current information pre-filled in the appropriate fields. They can edit any information they choose, including their profile picture and background image, and click the "Save Changes" button to update their profile. The marker should see the changes reflected in the database, and the page should navigate back to the home page. The marker can also test changing the password by entering a new password and confirming it, and they should see the password updated in the database.
## Feature 14: **Watchlist Page**
----
### **Description:**
The Watchlist feature allows users to add and remove movies from their watchlist, which is saved in the backend server. This feature displays the user's watchlist with the movie title, status, rating, genre, start year, and type, along with the ability to remove movies from the list.

### **Implementation Strategy:**
The Watchlist feature is implemented as a React functional component with the useState hook to manage the state of the component. It uses Redux for state management, react-redux for connecting the component to the store, and react-router-dom for navigation. It also imports packages such as react-bootstrap and react-bootstrap-icons for UI elements. The component fetches data from the server using the fetch API and performs CRUD operations using HTTP methods such as GET and DELETE.

### **Dependencies:**
The Watchlist feature depends on the server-side watchlist API, which stores the user's watchlist data. It also depends on the Redux store, which stores the user's authentication data and the watchlist data.

### **Current State:**
The Watchlist feature is fully implemented and functional. The user can view their watchlist, remove movies from the list, and the updated watchlist data is stored in the server and updated in the Redux store.

### **Related Code Sections:**
The removeFromWatchlist function (lines 22-39) is the main code section related to this feature.

### **Related Code Sections:**
Testing:
To test the Watchlist feature, run the server-side watchlist API and verify that it stores and retrieves watchlist data correctly. Then, use the Watchlist feature in the application and verify that the user can view their watchlist, remove movies from the list, and that the updated watchlist data is stored in the server and updated in the Redux store. Test code is not provided.

### **Related Code Sections:**
User Interface:
The user should see a page with their watchlist, including the movie title, status, rating, genre, start year, and type. Each movie should have a "remove" button that allows the user to remove the movie from the list. The application should respond by removing the movie from the list and updating the watchlist data in the server and Redux store. The UI design and implementation of this feature can be seen in the demo video.
## Feature 15: **Navigation Bar**
----
### **Description:**
HeaderNav is a client-side feature that implements a navigation bar with a brand logo, search bar, watchlist button, dropdown menu with links to the user's profile and account settings, and a light/dark mode switch. The component is built using React and the React-Bootstrap library and uses Redux and React Router for state management and navigation within the application.

### **Implementation:**
The HeaderNav component is implemented using React functional components and React-Bootstrap components, including Navbar, Nav, Button, Dropdown, and Container. It also imports several icons from the React-Bootstrap-icons library. The component uses Redux for state management and imports the useDispatch and useSelector hooks to dispatch actions and retrieve data from the Redux store. Additionally, the component uses React Router to handle navigation between pages in the application.

### **Dependencies:**
HeaderNav depends on other features and project modules such as Redux, React Router, and search and watchlist features. It retrieves user information from the Redux store, and the watchlist button triggers a fetch request to get the user's watchlist and navigate to the watchlist page.

### **State of Implementation:**
The HeaderNav feature is complete and fully functional. All code sections related to this feature are included in the shared code.

### **Testing:**
As this is a client-side feature, testing can be performed by running the application and manually testing the functionality of the HeaderNav component. The user should see a navigation bar at the top of the screen with a brand logo, search bar, watchlist button, dropdown menu with links to the user's profile and account settings, and a light/dark mode switch. The application should respond to user interactions, such as clicking the watchlist button or links in the dropdown menu, by navigating to the appropriate pages or triggering the appropriate actions. No additional test code is provided as this is not a server-side feature.

Overall, the HeaderNav component provides an intuitive and user-friendly navigation experience for the application.