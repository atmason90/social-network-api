const { Users } = require('../models');

module.exports = {
    // get all users
    getAllUsers(req, res) {
        Users.find({})
        .populate({ path: 'thoughts', select: '-__v' })
        .populate({ path: 'friends', select: '-__v' })
        .select('-__v')
        .then(UsersData => res.json(UsersData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // get user by id
    getUsersById({ params }, res) {
        Users.findOne({ _id: params.id })
        .populate({ path: 'thoughts', select: '-__v' })
        .populate({ path: 'friends', select: '-__v' })
        .select('-__v')
        .then(UsersData => {
            if(!UsersData) {
                res.status(404).json({ message: 'Invalid User Id' });
                return;
            }
            res.json(UsersData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    // create users
    createUsers({ body }, res) {
        Users.create(body)
        .then(UsersData => res.json(UsersData))
        .catch(err => res.status(400).json(err));
    },

    // update users
    updateUsers({ params, body }, res) {
        Users.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(UsersData => {
            if(!UsersData) {
                res.status(404).json({ message: 'Invalid User Id' });
                return;
            }
            res.json(UsersData);
        })
        .catch(err => res.json(err))
    },

    // delete users
    deleteUsers({ params }, res) {
        Users.findOneAndDelete({ _id: params.id })
        .then(UsersData => {
            if(!UsersData) {
                res.status(404).json({ message: 'Invalid User Id'});
                return;
            }
            res.json(UsersData);
        })
        .catch(err => res.status(400).json(err));
    },

    // add a friend
    addFriend({ params }, res) {
        Users.findOneAndUpdate(
            { _id: params.id }, { $addToSet: { friends: params.friendId } }, { new: true })
            .then(UsersData => {
                if(!UsersData) {
                    res.status(404).json({ message: 'Invalid User Id' });
                    return;
                }
                res.json(UsersData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete a friend
    deleteFriend({ params }, res) {
        Users.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { new: true })
        .populate({ path: 'friends', select: '-__v' })
        .then(UsersData => {
            if(!UsersData) {
                res.status(404).json({ message: 'Invalid User Id' });
                return;
            }
            res.json(UsersData);
        })
        .catch(err => res.status(400).json(err));
    }
};