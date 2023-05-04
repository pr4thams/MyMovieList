// Import the recentlyViewed and title_basics models
import recentlyViewed from "../models/recentlyViewed.js";
import title_basics from "../models/title.basics.js";

// Define the getRecentlyViewed function
export const getRecentlyViewed = async (req, res) => {
  try {
    // Define the number of items per page and the page number to display
    const PAGE_SIZE = 10;
    const pageNum = parseInt(req.query.pageNum) || 1;
    const skip = (pageNum - 1) * PAGE_SIZE;

    // Aggregate the recentlyViewed collection to get the most recent document for each movieId associated with the email provided
    const recentlyViewedObjs = await recentlyViewed.aggregate([
      { $match: { email: req.params.email } },
      { $sort: { searchTime: -1 } },
      { $group: { _id: '$movieId', document: { $first: '$$ROOT' } } },
      { $replaceRoot: { newRoot: '$document' } },
      { $skip: skip },
      { $limit: PAGE_SIZE }
    ]).exec();

    // Extract the movieIds from the recentlyViewed documents
    const movieIds = recentlyViewedObjs.map(obj => obj.movieId);

    // Query the title_basics collection to get the primaryTitle for each movieId
    const titleObjs = await title_basics.find({ tconst: { $in: movieIds } }).exec();

    // Extract the primaryTitle from the title_basics documents
    const recentlyViewedTitles = titleObjs.map(obj => obj.primaryTitle);

    // Send the list of recently viewed movie titles as the response
    res.status(200).json({
      page: pageNum,
      pageSize: PAGE_SIZE,
      totalResults: recentlyViewedTitles.length,
      totalPages: Math.ceil(recentlyViewedTitles.length / PAGE_SIZE),
      results: recentlyViewedTitles
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
