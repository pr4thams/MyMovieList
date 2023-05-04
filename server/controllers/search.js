import title_basics from "../models/title.basics.js";
import recentlyViewed from "../models/recentlyViewed.js";
import ratingObj from "../models/title.ratings.js";

/* Searches for the provided title and adds it to recent collection */
export const searchTitle = async (req, res) => {
  try {
    // Get the primaryTitle parameter from the request
    const Title = req.params.primaryTitle;
    // Find a title in title_basics collection that matches the provided primaryTitle
    const titleObj = await title_basics.findOne({ primaryTitle: { $regex: Title, $options: 'i' } });
    // If no title is found, return a message
    if (titleObj.length === 0) {
      return res.status(201).json({ message: 'Title not found' });
    }

    // Get the email parameter from the request
    const { email } = req.params;
    // If no email is provided, return a message
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Create a new recentlyViewed object with the email, movieId, primaryTitle, and searchTime
    const recentlyViewedObj = new recentlyViewed({
      email: email,
      movieId: titleObj.tconst,
      primaryTitle: titleObj.primaryTitle,
      searchTime: new Date()
    });
    // Save the recentlyViewed object
    await recentlyViewedObj.save();

    // Return the title object
    res.status(200).json({ titleObj });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/* Returns all titles matching the provided primaryTitle */
export const searchTitles = async (req, res) => {
  try {
    // Get the primaryTitle parameter from the request
    const Title = req.params.primaryTitle;
    // Find all titles in the title_basics collection that match the provided primaryTitle
    const titleObjs = await title_basics.find({ primaryTitle: { $regex: Title, $options: 'i' } });
    // If no titles are found, return a message
    if (titleObjs.length === 0) {
      return res.status(201).json({ message: 'Title not found' });
    }

    // Return the list of title objects
    res.status(200).json({ titleObjs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
