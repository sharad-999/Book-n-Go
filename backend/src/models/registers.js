const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  phone: {
    type: Number,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//model is used to create collection
const Userdata = new mongoose.model("Userdata", userSchema);
module.exports = Userdata;
