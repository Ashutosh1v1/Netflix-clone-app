const User = require("../models/UserModel");

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const MovieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!MovieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "movie already added to the liked list" });
    } else await User.create({ email, likedMovies: [data] });

    return res.json({ msg: "movie added succsessfully" });
  } catch (err) {
    return res.json({ msg: "error adding movie" });
  }
};

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      res.json({ msg: "Success", movies: user.likedMovies });
    } else return res.json({ msg: "user with given email not found." });
  } catch (err) {
    return res.json({ msg: "error fetching movie" });
  }
};

module.exports.removefromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieIndex = likedMovies.findIndex(({ id }) => id === movieId);
      if (!movieIndex) return res.status(400).send({ msg: "movie not found" });
      likedMovies.splice(movieIndex, 1);

      await User.findByIdAndUpdate(user._id, { likedMovies }, { new: true });
      return res.json({ msg: "movie deleted", movies: likedMovies });
    }
  } catch (err) {
    console.log(err);
    return res.json({ msg: "movie deletion failed" });
  }
};
