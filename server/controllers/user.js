import User from "../models/users.js";
import bcrypt from 'bcrypt';

// Read
export const getUser = async (req,res) => {
    try {
        const {name} = req.params;
        const user = await User.find({email});
        res.status(200).json(user);
    } catch (err) {
        throw err;
    }
}

export const getUserbyName = async (req, res) => {
    try {
      const name = req.params.firstName;
      const userObjs = await User.find({ firstName: { $regex: name, $options: 'i' } });
      if (userObjs.length === 0) {
        return res.status(201).json({ message: 'User not found' });
      }
      res.status(200).json({ userObjs });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

export const getAllUsers = async (req,res) => {
    try {
        const allUSers = await User.find();
        res.status(200).json(allUSers);
        console.log(typeof allUSers)
    } catch (err) {
        console.log("no user");
    }
}

// Create
export const createUser = async (req,res) => {
    try {
        const newUser = new User ({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            friends: req.body.friends
        })
        await newUser.save();
        const user = await User.find();
        res.status(201).json(user);    
    } catch (err) {
        throw err
    }
}

// Update
export const updateUserPass = async (req,res) => {
    try {
        const { email } = req.params;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        let change = {
            'password': hashedPassword,
        }
        const updatedInfo = await User.updateOne({email},change);
        res.status(200).json(updatedInfo);  
    }catch (err) {
        throw err
    }
}

export const updateUser = async (req,res) => {
    try {
        const url = req.protocol + '://' + req.get('host')
        const { email } = req.params;
        const user = await User.find({email});
        const first = req.body.firstName ? req.body.firstName : user.firstName;
        const last = req.body.lastName ? req.body.lastName : user.lastName;
        const emailAddress = req.body.email ? req.body.email : email;

        let change = {
            'firstName': first,
            'lastName': last,
            'email': emailAddress,
            'bio': req.body.bio,
        }
        const updatedInfo = await User.updateOne({email},change);
        const newUser = await User.find({emailAddress})
        res.status(200).json(newUser);  
    }catch (err) {
        throw err
    }
}
export const updatePicture= async (req,res) => {
    try {
        const url = req.protocol + '://' + req.get('host')
        const { email } = req.params;
        const user = await User.find({email});
        const picturePath = req.file.filename ? req.file.filename : user.profilePath;
        const emailAddress = req.body.email ? req.body.email : email;

        let change = {
            'picturePath': url + '/uploads/' + picturePath,
        }
        const updatedInfo = await User.updateOne({email},change);
        const newUser = await User.find({emailAddress})
        res.status(200).json(newUser);  
    }catch (err) {
        throw err
    }
}
export const updateBackground = async (req,res) => {
    try {
        const url = req.protocol + '://' + req.get('host')
        const { email } = req.params;
        const user = await User.find({email});
        const backgroundPath = req.file.filename ? req.file.filename : user.backgroundPath;
        const emailAddress = req.body.email ? req.body.email : email;

        let change = {
            'backgroundPath': url + '/uploads/' + backgroundPath,
        }
        const updatedInfo = await User.updateOne({email},change);
        const newUser = await User.find({emailAddress})
        res.status(200).json(newUser);  
    }catch (err) {
        throw err
    }
}

// Delete
export const deleteUser = async (req,res) => {
    const { email } = req.params;
    let obj = await User.deleteOne({email})
        if (obj.deletedCount > 0){
            res.status(200).json({message: "user deleted"});
            return 'Object was deleted.'
        }else{
            return 'Object was not found'
        }
    
}