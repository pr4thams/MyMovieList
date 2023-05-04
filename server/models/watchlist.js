import mongoose from 'mongoose';

const WatchlistSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    movieId: { type: String, required: true },
    primaryTitle: { type: String, required: true},
    genres: { type: String, required: true},
    startYear: { type: String, required: true},
    titleType: { type: String, required: true},
    userRating: { type: String },
    Status: { type: String }
  },
  { collection: 'watchlists'},
  { timestamps: true}
);

const watchlistObj = mongoose.model("watchlists", WatchlistSchema);
export default watchlistObj;