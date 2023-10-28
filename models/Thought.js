const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
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


//Retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
})


const Thoughts = model("thoughts", thoughtSchema);


module.exports = Thoughts;
