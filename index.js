const express = require("express"),
  app = express(),
  bodyParser = require("body-parser");

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

//app get

// The API endpoint is GET [project_url]/api/timestamp/:date_string?
// A date string is valid if can be successfully parsed by new Date(date_string) (JS) . Note that the unix timestamp needs to be an integer (not a string) specifying milliseconds. In our test we will use date strings compliant with ISO-8601 (e.g. "2016-11-20") because this will ensure an UTC timestamp.
// If the date string is valid the api returns a JSON having the structure {"unix": <date.getTime()>, "utc" : <date.toUTCString()> } e.g. {"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}.
// If the date string is invalid the api returns a JSON having the structure {"unix": null, "utc" : "Invalid Date" }. It is what you get from the date manipulation functions used above.
//1450137600000

app.get("/api/timestamp/:date_string?", (request, response) => {
  const dateString = request.params.date_string;
  console.log(dateString);
  let date;
  // If the date string is empty it should be equivalent to trigger new Date(), i.e. the service uses the current timestamp.
  if (!(dateString)) {
    date = new Date();
  } else {
    // non-empty dateString
    // if datestring is integer, convert dateString to an integer
    if (Number(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }
  response.json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.use(express.static("public"));
app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

const portNumber = process.env.PORT || 8080;
app.listen(portNumber, () => {
  console.log(`listening on port ${portNumber}`);
});
