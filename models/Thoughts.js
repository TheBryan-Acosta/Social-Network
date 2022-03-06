const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFormat.js");

const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: "error",
			minlength: 1,
			maxlength: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp),
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		reactions: [reactionSchema],
	},
	{
		toJSON: {
			getters: true,
		},
		id: false,
	}
);
thoughtSchema.virtual("reactionCount").get(() => {
	if (!this.reactions) {
		return 0;
	}
	return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
