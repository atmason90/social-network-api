// require express router
const router = require('express').Router();

// import from thoughts controller
const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughts-controller');

// /api/thoughts - return all thoughts
router.route('/')
    .get(getAllThoughts);

// /api/:id - get, put, delete thoughts 
router.route('/:id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts);

// /api/:userId - post thoughts
router.route('/:userId')
    .post(createThoughts);

// /api/:thoughtId/reactions - post reactions
router.route('/:thoughtId/reactions')
    .post(createReaction);

// /api/thoughts/:thoughtId/reactionId - delete reactions
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

// export
module.exports = router;