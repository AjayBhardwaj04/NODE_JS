import  express  from "express";

const app = express();

app.get("/",(req,res)=>{

   
    res.sendStatus(404);
})


app.listen(4000, () => {
    console.log("App Srever Runig PORT : 4000");
}) 