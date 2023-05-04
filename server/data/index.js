import mongoose from "mongoose";

const userIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
];

export const users = [
    {
        _id: userIds[0],
        firstName: "Pratham",
        lastName: "Sharma",
        email: "prathams@gmail.com",
        password: "password",
        friends: []
    },
    {
        _id: userIds[1],
        firstName: "Bhavesh",
        lastName: "Ganesh",
        email: "bganesh@gmail.com",
        password: "password",
        friends: []
    },
]

export const watchlist = [
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[0],
        movieId: "",
        movieName: "",
        userRating: "8/10",
    }
]