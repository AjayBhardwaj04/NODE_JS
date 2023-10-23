import express from "express";
import path from "path";

const app = express();

const users = [];

// Usind all Meddlewares
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/add", (req, res) => {
  // res.render("index");
  res.send("Good !!")
});

app.get("/success", (req, res) => {
  res.render("success"); 
});

app.post("/contact", (req, res) => {
  users.push({ username: req.body.name, email: req.body.email });
  res.redirect("/success");
});

app.get("/user", (req,res) => {
  res.json({
    users,
  })
} )

app.listen(4000, () => {
  console.log("server is conected");
});
