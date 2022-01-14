const User = require("../models/Usres");

//ERROR HANDLER
const erroHandler = (err) => {
    let errors = { email: "", password: "" };
    //Duplicate email code
    if (err.code === 11000) {
        errors.email = "That email is already in use";
        return errors;
    }

    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};

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
        res.status(201).json(user);
    } catch (err) {
        const errors = erroHandler(err);
        res.status(400).json({ errors });
    }
};

module.exports.login_post = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    res.send("Login Request");
};
