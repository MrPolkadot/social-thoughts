const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");


//Aggregate function to retrieve total number of users
const userCount = async () => {
    const totalUsers = await User.aggregate().count("userCount");
    return totalUsers;
};


//Aggregate function to retrieve thought and friend data

const userData = async (userId) =>
    User.aggregate([
        //Filters a single user with $match
        { $match: { _id: new ObjectId(userId) } },
        {
            $group: {
                _id: new ObjectId(userId),
            },
        },
    ]);



module.exports = {
    //Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();

            const userObject = {
                users,
                userCount: await userCount(),
            };

            res.json(userObject);

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //Get a single user by ID
    async getSingleUser(req, res) {
        try {
            const singleUser = await User.findOne({ _id: req.params.userId });

            if (!singleUser) {
                return res.status(404).json({ message: "No user with that ID" });
            }

            res.json({
                singleUser,
                userData: await userData(req.params.userId),
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //Creates a new user(POST)
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Updates user by its _id(PUT)
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!updatedUser) {
                res.status(404).json({ message: "No user found with that Id" });
            }
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Deletes user by its _id(DELETE)
    async deleteUser(req, res) {
        try {
            const destroyUser = await User.findOneAndDelete({ _id: req.params.userId });

            if (!destroyUser) {
                res.status(404).json({ message: "No user found with that Id" })
            };

            await User.deleteMany({ _id: { $in: destroyUser.thoughts } });


        } catch (err) {
            res.status(500).json(err);
        }
    },









};