import User from "../models/users.js";

export const addFriend = async (req,res) => {
    try {
        const { email } = req.params;
        const { friendEmail } = req.body;
        const user = await User.findOne({ email });
        const friend = await User.findOne({ email: friendEmail });
        if (!friend) return res.status(404).json({ message: "Friend not found" });
        if (user.friends.includes(friend.email)) return res.status(400).json({ message: "Friend already added" });
        user.friends.push(friend);
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        throw err;
    }
}

export const removeFriend = async (req,res) => {
    try {
        const { email } = req.params;
        const { friendEmail } = req.body;
        const user = await User.findOne({ email });
        const friend = await User.findOne({ email: friendEmail });
        if (!friend) return res.status(404).json({ message: "Friend not found" });
        //if (!user.friends.some(item => JSON.stringify(item) === JSON.stringify(friend))) return res.status(400).json({ message: "Friend not found in your list" });
        user.friends = user.friends.filter(f => f.email !== friendEmail);
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        throw err;
    }
}

export const getFriends = async (req,res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email }).populate('friends');
        const friendObj = user.friends;
        res.status(200).json(friendObj);
    } catch (err) {
        throw err;
    }
}
