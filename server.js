var express = require("express");
var axios = require("axios");
const Mailjet = require("node-mailjet");
var private = {
  //using mailJet
MJ_APIKEY_PUBLIC: "", //public
MJ_APIKEY_PRIVATE: "", //secret
};

var app = express();

app.use(express.static("public"));
app.use("/assets", express.static("assets"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get('/data',(req, res) => { //figure out a way to make api data into arrays with objects
  data = {
    sender: "bob",
    time: "1000",
  };
  res.json({data:data});
})
const port = 5500;
app.listen(port, () => {
  console.log("Server running");
});
