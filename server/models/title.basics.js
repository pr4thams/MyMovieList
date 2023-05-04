import mongoose from "mongoose";

const titleBasicsSchema = new mongoose.Schema({
        tconst: {
            type: String,
            required: true
          },
          titleType: {
            type: String,
            required: true
          },
          primaryTitle: {
            type: String,
            required: true
          },
          originalTitle: {
            type: String,
            required: true
          },
          isAdult: {
            type: Number,
            required: true
          },
          startYear: {
            type: Number,
            required: true
          },
          endYear: {
            type: String,
          },
          runtimeMinutes: {
            type: Number,
          },
          genres: {
            type: String,
            required: true
          }
        },
        { collection: 'title.basics' },
        { timestamps: true },
        );

const title_basics = mongoose.model('title.basics', titleBasicsSchema);
export default title_basics;