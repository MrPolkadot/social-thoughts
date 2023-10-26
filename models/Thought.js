const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_Length: 1,
            max_Length: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
            //add getter method to format the timestamp on query
        },
        toJSON: {
            getters: true,
            virtuals: true
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    }
);


const Thoughts = model("thoughts", thoughtSchema);
// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.


module.exports = Thoughts;
