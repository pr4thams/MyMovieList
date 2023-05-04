import mongoose from "mongoose";

const titleRatingsSchema = new mongoose.Schema({
    tconst: {type: String, required: true},
    averageRating: {type: Number },
    numVotes: {type: Number }
},
    { collection: 'title.ratings' },
    { timestamps: true }
);

const ratingObj = mongoose.model('title.ratings', titleRatingsSchema);
export default ratingObj;