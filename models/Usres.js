const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bycrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Minimum lengh is 6 characters"],
    },
});

userSchema.pre("save", async function (next) {
    const salt = await bycrypt.genSalt();
    this.password = await bycrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    if (isEmail(email)) {
        const user = await this.findOne({ email });
        if (user) {
            const auth = await bycrypt.compare(password, user.password);
            if (auth) return user;
            throw Error("incorrect password");
        }
        throw Error("incorrect email");
    }
    throw Error("not an email");
};

const User = new mongoose.model("user", userSchema);

module.exports = User;
