const User = require("../models/User");

// Route 1: Create User
exports.addUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// Route 2: Add Profile
exports.addProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profiles.push(req.body);
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// Route 3: Get Users (with optional profile filter)
exports.getUsers = async (req, res, next) => {
  try {
    const { profile } = req.query;
    let users;

    if (profile) {
      users = await User.find({ "profiles.profileName": profile });
    } else {
      users = await User.find();
    }

    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Route 4: Search
exports.searchUser = async (req, res, next) => {
  try {
    const { name, profile } = req.query;

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userProfile = user.profiles.find((p) => p.profileName === profile);

    if (userProfile) {
      return res.json({ user: user.name, profile: userProfile });
    } else {
      return res.json({
        message: "User found, but profile not found",
        user,
      });
    }
  } catch (err) {
    next(err);
  }
};

// Route 5: Update Profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { userId, profileName } = req.params;
    const { url } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const profile = user.profiles.find((p) => p.profileName === profileName);
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    profile.url = url;
    await user.save();

    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Route 6: Delete Profile
exports.deleteProfile = async (req, res, next) => {
  try {
    const { userId, profileName } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profiles = user.profiles.filter((p) => p.profileName !== profileName);
    await user.save();

    res.json({ message: "Profile deleted", user });
  } catch (err) {
    next(err);
  }
};
