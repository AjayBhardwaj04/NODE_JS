import http from "http";
import funasdfsa from "./funtion.js";

console.log(funasdfsa());

const server = http.createServer((req, res) => {
  if (req.url === "/") { 
    res.end(`<h1>Jai Shree Ram : ${funasdfsa()}</h1` );
  } else if (req.url === "/about") {
    res.end("<h1>About page</h1>");
  } else if (req.url === "/contact") {
    res.end("<h1>contact page</h1>");
  } else if (req.url === "/project") {
    res.end("<h1>Project page</h1>");
  } else {
    res.end("<h1>Page NOT Found!!!!</h1>");
  }
});

server.listen(4000, () => {
  console.log("Server is Runing ~");
});
