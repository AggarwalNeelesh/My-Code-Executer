const express = require("express");
const app = express();
const cors = require("cors");
const { createSubmission } = require("./createSubmission");
const { Languages } = require("./Languages");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  console.log("backend worked");
  res.send("Welcome to backend");
});
app.get("/getLanguages", async (req, res) => {
  let languages = await Languages();
  console.log("Languages Fetched Successfully");
  res.send(languages);
});
app.post("/", async (req, res) => {
  var code = JSON.parse(req.body.code);
  var language = parseInt(req.body.language);
  var input = JSON.parse(req.body.input);
  console.log("Connected to Server");
  let result = await createSubmission(code, language, input);
  // console.log("Output  --> ",result);
  res.send(result);
});
app.listen(5500);
/*
    The error I faced during the program was, when I submitted code to API for submission, I received a token
    and immediately I send to token to API to get the output
    But Sometimes the code was not completed and still processing at API , so it given a output null
    and when I test the endpoint again at the website of the API , It gives correct output for that token
    So I thought why I was not able to get the correct output for this token,
    I double checked my fetch method for token, But nothing seems to be wrong,
    Then I justed the entire response on the console and checked line by line.
    At one line I saw a strange thing, The status was 200, Which means there were no error,
    but the status description was 'Processing' , Then it clicked in my mind that ,While i submitted token to 
    get result , The code was still running so it hasen't return any output.

    So to rectify that error, I made a while loop , and keep on hitting the API again and again with that token until
    the Status description was changed from 'Processing' to 'Submitted' or 'Error'.
*/
