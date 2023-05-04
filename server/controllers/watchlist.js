import watchlistObj from "../models/watchlist.js";


// create a singular watchlist item
export const addToWatchlist = async (req, res) => {
  try {
    const { movieId, email } = req.body;
    const newWatchlistObj = new watchlistObj({
      email,
      movieId,
      primaryTitle: req.body.primaryTitle,
      genres: req.body.genres,
      startYear: req.body.startYear,
      titleType: req.body.titleType,
      userRating: req.body.userRating,
      Status: req.body.Status
    });
    const existingItem = await watchlistObj.find({ email, movieId });
    if (existingItem.length !== 0) return res.status(200).json({ message: 'Title already in watchlist' });

    await newWatchlistObj.save();

    const watchlistObject = await watchlistObj.find();
    res.status(201).json({ watchlistObject, message: 'Item Added' });
  } catch (err) {
    res.status(409).json({ message: err.message })
  }
};

// get all watchlist items for a user
export const getUserWatchlist = async (req, res) => {
  try {
    const { email } = req.params;
    const watchlist = await watchlistObj.find({ email });
    res.status(200).json({ watchlist });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// remove a watchlist item
export const removeFromWatchlist = async (req, res) => {
  try {
    const { movieId } = req.body;
    const email = req.params.email;

    const removedItem = await watchlistObj.deleteOne({ movieId, email });
    if (removedItem.deletedCount === 0) return res.status(201).json({ message: "Title not found in watchlist" });

    res.status(200).json({ message: "Movie Deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  };
};
