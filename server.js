var express = require("express");
var axios = require("axios");
var private = {
  //using mailJet
  api_key: "ade47dbdb5b73a60d480a14a82d70553",
  get_endpoint: "https://api.mailjet.com/v3/REST/message",
};
var app = express();

app.use(express.static("public"));
app.use("/assets", express.static("assets"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const port = 5500;
app.listen(port, () => {
  console.log("Server running");
});
