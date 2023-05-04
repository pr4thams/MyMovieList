import User from "../models/users.js";
import title_basics from "../models/title.basics.js";

export const userList = async (req, res) => {
  try {
    // Extract the email, tconst, and titles fields from the request body
    const { email, tconst, titles } = req.body;

    // Check if the tconst provided is valid
    const titleObj = await title_basics.findOne({ tconst: tconst });
    if (!titleObj) {
      return res.status(201).json({ message: 'Invalid tconst' });
    }

    // Find the user document with the matching email and update the userList field
    const user = await User.findOneAndUpdate(
      { email: email },
      { $push: { userList: { tconst, titles } } },
      { new: true } // Return the updated user document
    );

    // If the user document was successfully updated, send it back as a response
    res.status(200).json(user);
  } catch (err) {
    // If an error occurred, log it and send a 500 Internal Server Error response
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
