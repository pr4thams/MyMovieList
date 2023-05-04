import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
            default: ''
        },
        friends: {
            type: Array,
            default: [],
        },
        login_status: {
            type: Boolean,
            default: false,
        },
        joined: {
            type: Date,
            default: Date.now,
        },
        picturePath: {
            type: String,
            default: "",
        },
        backgroundPath: {
            type: String,
            default: "",
        },
        userList: [{
            _id: false,
            tconst: {
                type: String,
                required: true,
            },
            titles: {
                type: Array,
                required: true,
                default: [],
            },
        }],
        
    },
    { collection: 'users' },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;