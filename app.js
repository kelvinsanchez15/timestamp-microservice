const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("MAIN ROUTE"));

app.get("/api/timestamp/:date_string?", (req, res) => {
  const input = req.params.date_string;
  let date;

  if (input) {
    date = new Date(input);
  } else {
    date = new Date();
  }

  if (date == "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.listen(port, () => console.log(`Server runnig at port ` + port));
