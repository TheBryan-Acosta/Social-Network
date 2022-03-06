const router = require("express").Router();

const {
	addTht,
	getTht,
	getOneTht,
	updateTht,
	deleteTht,
	addReaction,
	removeReaction,
} = require("../../controllers/thought.controller");

router.route("/").post(addTht).get(getTht);

router.route("/:thoughtId").get(getOneTht).put(updateTht).delete(deleteTht);

router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
