const router = require('express').Router();

// const { get } = require('express/lib/response');
// import from users controller
const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
} = require('../../controllers/users-controller');

// get and post routes for users
router.route('/')
    .get(getAllUsers)
    .post(createUsers);

// get by Id, put, delete routes for users
router.route('/:id')
    .get(getUsersById)
    .put(updateUsers)
    .delete(deleteUsers);

// add and delete friends
router.route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;