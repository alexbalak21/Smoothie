const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/aouthRoutes");
const cookieParser = require("cookie-parser");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = "mongodb+srv://alexblack:test1234@cluster0.tljd5.mongodb.net/node-auth";
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => {
        app.listen(3000);
        console.log("server started at: http://localhost:3000/");
    })
    .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(authRoutes);

app.get("/cookies", (req, res) => {
    res.cookie("user", "Alex", { httpOnly: true });
    res.send("Got Cookies");
});

app.get("/read", (req, res) => {
    const cookies = req.cookies;
    res.json(cookies);
});
