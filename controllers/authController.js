const User = require("../models/Usres");
const jwt = require("jsonwebtoken");
const secretKey = "Jc7xSToNXLdBXsmrR6Rej4EstJ6oMNbi";

//ERROR HANDLER
const erroHandler = (err) => {
    let errors = { email: "", password: "" };
    //Duplicate email code
    if (err.code === 11000) {
        errors.email = "That email is already in use";
        return errors;
    }

    //Not an Email
    if (err.message == "not an email") {
        errors.email = "eter a valid email adress";
        return errors;
    }
    if (err.message == "incorrect email") {
        errors.email = "email not in registered";
        return errors;
    }
    if (err.message == "incorrect password") {
        errors.password = "incorrect password";
        return errors;
    }

    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};

//CREATE TOKEN
function createToken(id) {
    return jwt.sign({ id }, secretKey, { expiresIn: "60m" });
}

module.exports.signup_get = (req, res) => {
    res.render("signup");
};
module.exports.login_get = (req, res) => {
    res.render("login");
};

//SIGNUP REQUEST
module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true });
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = erroHandler(err);
        res.status(400).json({ errors });
    }
};

//LOGIN REQUETS
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true });
        res.status(200).json({ user: user._id });
    } catch (error) {
        const errors = erroHandler(error);
        res.status(400).json({ errors });
    }
};

module.exports.logout_get = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
};
