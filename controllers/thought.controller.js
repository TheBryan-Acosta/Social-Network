const { Thought, User } = require("../models");

const thoughtController = {
	//get all thoughts
	getTht: (req, res) => {
		Thought.find({})
			.select("-__v")
			.then((response) => res.json(response))
			.catch((err) => {
				res.status(400).json(err);
			});
	},
	//get single thought by id
	getOneTht: (req, res) => {
		Thought.findOne({ _id: req.params.thoughtId })
			.select("-__v")
			.then((response) => {
				if (!response) {
					res.status(404).json({ message: `No thought with id found` });
				}
				res.json(response);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	},
	//add a thought
	addTht: (req, res) => {
		Thought.create(req.body)
			.then((response) => {
				return User.findOneAndUpdate(
					{ _id: req.body.userId },
					{ $push: { thoughts: response._id } },
					{ new: true }
				);
			})
			.then((response) => {
				if (!response) {
					res.status(404).json({
						message: `error no user found with that id`,
					});
				}
				res.status(201).json({ message: "Thought generated!" });
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	},
	//update a thought
	updateTht: (req, res) => {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((response) => {
				if (!response) {
					res.status(404).json({ message: `No thought found with this id` });
				}
				res.json(response);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	},
	//delete thought
	deleteTht: (req, res) => {
		Thought.findOneAndRemove({ _id: req.params.thoughtId })
			.then((response) => {
				if (!response) {
					res.status(404).json({ message: `No thought found with this id` });
				}
				return User.findOneAndUpdate(
					{ thoughts: req.params.thoughtId },
					{ $pull: { thoughts: req.params.thoughtId } },
					{ new: true }
				);
			})
			.then((response) => {
				if (!response) {
					res.status(404).json({ message: `error` });
				}
				res.json({ message: "Thought deleted" });
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	},
	//add reaction
	addReaction: (req, res) => {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $addToSet: { reactions: req.body } },
			{ runValidators: true, new: true }
		)
			.then((response) => {
				if (!response) {
					res.status(404).json({ message: `error` });
				}
				res.status(201).json(response);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	},
	//remove reaction
	removeReaction: (req, res) => {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions: { reactionId: req.params.reactionId } } },
			{ runValidators: true, new: true }
		)
			.then((response) => {
				if (!response) {
					res.status(404).json({ message: `No thought found with this id` });
				}
				res.json({ message: "Reaction deleted" });
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	},
};

module.exports = thoughtController;
