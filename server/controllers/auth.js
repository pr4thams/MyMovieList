import bcrypt from 'bcrypt'; // Import bcrypt to hash password
import jwt from 'jsonwebtoken'; // Import jsonwebtoken to create and verify tokens
import User from '../models/users.js'; // Import the user model

/*  register user */
export const register = async (req,res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const newUser = new User ({
            firstName,
            lastName,
            email,
            password,
            joined: Date.now()
        });
        // Check if user already exists
        const existingUser = await User.find({ email });
        if (existingUser.length > 0) return res.status(200).json({ message: 'User already exists' });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        newUser.password = hashedPassword;

        // Save the new user document
        const savedUser = await newUser.save();
        res.status(201).json({savedUser, message: 'User registered successfully'});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/*  login user */
export const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        const users = await User.find({ email });
        if (users.length === 0) return res.status(201).json({message: "User does not exist."});

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password); // Check if password matches
        if (!isMatch) return res.status(202).json({ message: 'Invalid credentials.' });
        
        user.login_status = true;
        await user.save();

        // Create a JWT token
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        res.status(200).json({token , user, message: 'Login Success!'});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/*  logout user */
export const logout = async (req, res) => {
    // Invalidate the current JWT by setting it to an empty string
    const {email} = req.body;
    const user = await User.findOne({ email: email });
    res.cookie('jwt', '', { maxAge: 0 });
    user.login_status = false;
    await user.save();
    res.status(200).json({ user, message: 'Logout successful' });
};
