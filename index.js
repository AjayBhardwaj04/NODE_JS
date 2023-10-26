import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
const users = [];
// connected in MongoDB loacl Databade
mongoose
  .connect("mongodb://127.0.0.1:27017", { dbName: "backend" })
  .then(() => {
    console.log("Database is conected");
  })
  .catch((e) => {
    console.log(e);
  });
// Create user Schema
const userSchema = mongoose.Schema({
  name: String,
  email: String,
});
// Defanded schema
const User = mongoose.model("User", userSchema);

// Usind all Meddlewares
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
// Atuthenticarecn function 
const isAuthenticated = async(req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decoded = jwt.verify(token, "wed2342sadsadf");
    req.user = await User.findById(decoded._id);
    // console.log(decoded);
    next();
  } else {
    res.render("login");
  }
};

app.get("/", isAuthenticated, (req, res) => {
  // console.log(req.user);
  res.render("logout",{name:req.user.name});
});

app.get(
  "/",
  (req, res, next) => {
    const { token } = req.cookies;

    if (token) {
      next();
    } else {
      res.render("login");
    }
  },
  (req, res) => {
    res.render("index");
  }
);

// Login  Authentication
app.post("/login", async (req, res) => {
  const { name, email } = req.body;
  const user = await User.create({ name, email });
  const token = jwt.sign({ _id: user._id }, "wed2342sadsadf");
  // console.log(token);
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });

  res.redirect("/");
});

// Logout Authentication
app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

// Add data in DataBase using schema
app.get("/add", async (req, res) => {
  const { name, email } = req.body;
  await User.create({ name, email });
  // res.send("Good !");
});

app.listen(4000, () => {
  console.log("server conected localhost : 4000");
});
