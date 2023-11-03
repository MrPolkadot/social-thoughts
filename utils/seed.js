// const connection = require("../config/connection");
// const { User, Thought } = require("../models");
// const userData = require("./data");

// connection.on("error", (err) => err);

// connection.once("open", async () => {
//     console.log("Connected");
//     //Delete collections if they exist
//     let userCheck = await connection.db.listCollections({ name: "users" }).toArray();
//     if (userCheck.length) {
//         await connection.dropCollection("users");
//     }

//     let thoughtCheck = await connection.db.listCollections({ name: "thoughts" }).toArray();
//     if (thoughtCheck.length) {
//         await connection.dropCollection("thoughts");
//     }

//     const users = [];

//     users.push({ userData });
//     console.log(userData);
//     await User.collection.insertMany(users);

//     await Thought.collection.insertOne({
//         thoughtText: "This thought is a test.",
//         username: "sal@test",
//         reactions: [...users],
//     });

//     console.table(users);
//     console.info("Seeding complete :)");
//     process.exit(0);

// });