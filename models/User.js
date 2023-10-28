const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: function (v) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
                },
                message: email => `${email.value} is not a valid email!`
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought"
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        toJSON: {
            virtuals: true
        }
    }
)

//Retrieves the length of the user's friends array field on query.
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("user", userSchema);





module.exports = User;
