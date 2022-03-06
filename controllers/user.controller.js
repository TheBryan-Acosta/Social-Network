const { User } = require("../models");

const UserController = {
	// get all users
	getAllUsers(req, res) {
		User.find({})
			.populate({
				path: "thoughts",
				select: "-__v",
			})
			.select("-__v")
			.then((response) => res.json(response))
			.catch((err) => {
				res.status(400).json(err);
			});
	},

	// get one user by id
	getUserById({ params }, res) {
		User.findOne({ _id: params.id })
			.populate({
				path: "thoughts",
				select: "-__v",
			})
			.select("-__v")
			.then((response) => {
				if (!response) {
					res.status(404).json({ message: "No user found with this id" });
					return;
				}
				res.json(response);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// create user
	createUser({ body }, res) {
		User.create(body)
			.then((response) => res.json(response))
			.catch((err) => res.status(400).json(err));
	},

	// update user by id
	updateUser({ params, body }, res) {
		User.findOneAndUpdate({ _id: params.id }, body, { new: true })
			.then((response) => {
				if (!response) {
					res.status(404).json({ message: "No user found with this id" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(400).json(err));
	},

	// delete user
	deleteUser({ params }, res) {
		User.findOneAndDelete({ _id: params.id })
			.then((response) => {
				if (!response) {
					res.status(404).json({ message: "No User found with this id!" });
					return;
				}
				res.json(true);
			})
			.catch((err) => res.status(400).json(err));
	},
	addFriend: (req, res) => {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $addToSet: { friends: req.params.friendId } },
			{ new: true }
		)
			.then((response) => {
				if (!response) {
					res.status(404).json({ message: "No user exists" });
				}
				res.json(response);
			})
			.catch((err) => {
				console.log(err);
				res.json(err);
			});
	},
	deleteFriend: (req, res) => {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $pull: { friends: req.params.friendId } },
			{ new: true }
		)
			.then((response) => {
				if (!response) {
					res.status(404).json({ message: "No user exists" });
				}
				res.json(response);
			})
			.catch((err) => {
				console.log(err);
				res.json(err);
			});
	},
};

module.exports = UserController;
