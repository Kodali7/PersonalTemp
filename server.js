// var express = require("express");
// var axios = require("axios");
// require("dotenv").config();
// const MailSlurp = require("mailslurp-client").default;
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import {MailSlurp} from "mailslurp-client";
dotenv.config();
import { fileTypeFromBuffer } from "file-type";
const apiKey = process.env.API_KEY;

const mailslurp = new MailSlurp({ apiKey }); //created a client with mailslurp and our api

var app = express();

app.use(express.static("public"));
app.use("/assets", express.static("assets"));
app.use(express.json());
let random_email = "";
let inbox;
app.post("/email", async (req, res) => {
  //getting email from frontend/client
  random_email = req.body.email;
  console.log(`Backend receieved: ${random_email}`);
  inbox = await mailslurp.inboxController.createInbox({
    emailAddress: random_email,
  }); //returns promise so have to use await
  console.log(`ID: ${inbox.id}`); //email_address associated with inbox different than one generated
  res.send({ message: "email received", email: random_email });
});

app.get("/emails", async (req, res) => {
  try {
    const emails = await mailslurp.getEmails(
      "5955b169-6863-4b86-a982-246ab11844c5",
      undefined
    ); //all emails erorr in this retrieveing
    console.log(`Email:`, emails);
    res.json({ data: emails });
  } catch (error) {
    console.log("ERROR in server ", error.message);
  }
});

app.post("/other-data", async (req, res) => {
  try {
    console.log("Request: ", req.body);
    const emailId = req.body.email.id;
    console.log("EmailId: ", emailId);
    const other_data = await mailslurp.getEmail(emailId); //email with details
    res.json({ data: other_data });
  } catch (error) {
    console.log("error: ", error.message);
  }
});

app.post("/get-attachments", async (req, res) => {
  try {
    let attachments = req.body.attachments;
    let image_array = [];
    for (const x of attachments) {
      let coded =
        await mailslurp.attachmentController.downloadAttachmentAsBase64Encoded({
          attachmentId: x,
        });
      // const byteArray = new Uint8Array(coded);
      const byteArray = Buffer.from(coded.base64FileContents, 'base64');
      console.log("Cont: ", byteArray);
      const file = await fileTypeFromBuffer(byteArray);
      console.log("File: ", file);
      image_array.push({
        base64: coded.base64FileContents,
        type: file.mime
      }); 
    }
    res.json({ images: image_array });
  } catch (error) {
    console.log("Image Error: ", error.message);
  }
});

app.get("/", (req, res) => {
  //to start server with html
  res.sendFile(__dirname + "/public/index.html");
});

// app.get("/data", (req, res) => {
//   //figure out a way to make api data into arrays with objects
//   data = {
//     sender: "bob",
//     time: "1000",
//   };
//   res.json({ data: data }); //find out where this goes
// });
const port = 5500;
app.listen(port, () => {
  console.log("Server running");
});
