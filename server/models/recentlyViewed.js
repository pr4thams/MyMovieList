import mongoose from "mongoose";

const recentlyViewedSchema = new mongoose.Schema({
    email:{ type: String, required: true },
    movieId: { type: String, required: true },
    primaryTitle: { type: String, required: true },
    searchTime: { type: Date, required: true}
},
{ collection: 'recentlyViewed' },
{ timestamps: true }
)

const recentlyViewed = mongoose.model('recentlyViewed', recentlyViewedSchema);
export default recentlyViewed;