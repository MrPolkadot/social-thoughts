const router = require("express").Router();

const userRoutes = require("./userRoutes");
const reactionRoutes = require("./reactionRoutes");
const thoughtRoutes = require("./thoughtRoutes");

router.use("/user", userRoutes);
router.use("/reaction", reactionRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;