const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/aouthRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./controllers/middleware");

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
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);
