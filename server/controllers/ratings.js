import watchlistObj from "../models/watchlist.js";
import ratingObj from "../models/title.ratings.js";

// Add or update a user rating for a movie in the watchlist
export const addUpdateRating = async (req, res) => {
  try {
    const { email, movieId, userRating } = req.body;

    // Find the item in the watchlist
    const watchlistItem = await watchlistObj.findOne({ email, movieId });
    if (!watchlistItem) {
      // If the item is not found in the watchlist, return an error
      return res.status(404).json({ message: 'Title not found in watchlist' });
    }

    // Update the user rating
    watchlistItem.userRating = userRating;
    await watchlistItem.save();

    // Return the updated watchlist
    const watchlist = await watchlistObj.find();
    res.status(200).json(watchlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all user ratings for a specific user
export const getUserRatings = async (req, res) => {
  try {
    const { email } = req.params;

    // Find all ratings for the user
    const userRatings = await watchlistObj.find({ email }, { _id: 0, userRating: 1, primaryTitle: 1, movieId: 1 });
    if (!userRatings) {
      // If no ratings are found for the user, return an error
      return res.status(404).json({ message: 'No ratings found for user' });
    }

    // Return the ratings
    res.status(200).json(userRatings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  };
};

// Get the average rating and number of votes for a movie
export const ratingStatistics = async (req, res) => {
  try {
    const { tconst } = req.params;

    // Check if tconst parameter is provided
    if (!tconst) {
      return res.status(400).json({ message: 'tconst parameter is required' });
    }

    // Find the rating object for the movie
    const rating = await ratingObj.findOne({ tconst: tconst });
    if (!rating) {
      // If the rating object is not found, return an error
      return res.status(404).json({ message: 'Rating statistics not found' });
    }

    // Return the average rating and number of votes
    const { averageRating, numVotes } = rating;
    res.status(200).json({ averageRating, numVotes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
