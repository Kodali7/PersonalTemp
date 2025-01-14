var express = require("express");
var axios = require("axios");
require('dotenv').config();
const MailSlurp = require('mailslurp-client').default;
const apiKey = process.env.API_KEY;

const mailslurp = new MailSlurp({apiKey}); //created a client with mailslurp and our api

var app = express();

app.use(express.static("public"));
app.use("/assets", express.static("assets"));
app.use(express.json());
let random_email = "";
let inbox;
app.post('/email', async (req, res) => { //getting email from frontend/client
  random_email = req.body.email;
  console.log(`Backend receieved: ${random_email}`);
  inbox = await mailslurp.inboxController.createInbox({emailAddress: random_email}); //returns promise so have to use await
  console.log(`ID: ${inbox.id}`); //email_address associated with inbox different than one generated
  res.send({ message: "email received", email: random_email }); 
});

app.get('/emails', async (req,res) => {
  const emails = await mailslurp.getAllEmails(inbox.id); //all emails
  res.json({data:emails});
})

app.get("/", (req, res) => { //to start server with html
  res.sendFile(__dirname + "/public/index.html");
});

app.get('/data',(req, res) => { //figure out a way to make api data into arrays with objects
  data = {
    sender: "bob",
    time: "1000",
  };
  res.json({data:data}); //find out where this goes
})
const port = 5500;
app.listen(port, () => {
  console.log("Server running");
});
