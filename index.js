import express from "express";
// import path from "path";

const app = express();


app.set("view engine" ,"ejs" );


app.get("/", (req, res) => {
 res.render("cdd" ,{name:"Ajay Raj"});
});

app.listen(4000, () => {
  console.log("App Srever Runig PORT : 4000");
});
