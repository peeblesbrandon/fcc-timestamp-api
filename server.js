// server.js
const express = require("express");
const app = express();
const cors = require('cors');

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(cors());

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// send the default array of dreams to the webpage
app.get("/api/timestamp/:date_string?", (req, res) => {
  var date_string = req.params.date_string;
  console.log(`New request with date_string value of : ${date_string}`);
  if (!date_string) {
    var date = new Date();
    console.log(date);
    return res.json({unix: date.getTime(), utc: date.toUTCString()});
  }
  
  var date = new Date(date_string); //attempt to parse the date_string
  if (date.toString() === 'Invalid Date' || !(date instanceof Date)) {
    // first check if its a unix timestamp 
    if (!isNaN(date_string)) {
      date = new Date(Number(date_string));
      res.json({unix: date.getTime()});
      res.status(200);
      return;
    }
    res.json({ error: 'Invalid Date' }); // if it wasnt a valid date 
    return;
  } else {
    res.status(200);
    res.json({unix: date.getTime(), utc: date.toUTCString()});
    return;
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
