const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxLength: 30,
      minLength: 3,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowerCase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 1500,
    },
    image: {
      type: String,
      default: "./uploads/default.jpg",
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw Error("Nom d'utilisateur invalide");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw Error("Mot de passe invalide");
  console.log("authenticated user reussi " + user.username);
  return user;
};

module.exports = mongoose.model("users", userSchema);
