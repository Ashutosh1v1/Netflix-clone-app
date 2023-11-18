const { addToLikedMovies , getLikedMovies, removefromLikedMovies } = require("../controllers/UserController");
const router = require("express").Router();

// here we created a middleware route to communicate with the client side-------
router.post("/add", addToLikedMovies);
router.get("/liked/:email", getLikedMovies );
router.put("/delete", removefromLikedMovies );

module.exports = router
