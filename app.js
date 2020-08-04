const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ optionSuccessStatus: 200 }));

app.use(express.static("public"));
app.get("/", (req, res) => res.sendFile(`${__dirname}/views/index.html`));

app.get("/api/timestamp/:date_string?", (req, res) => {
  const input = req.params.date_string;
  let date;

  if (!input) {
    date = new Date();
  } else {
    !isNaN(input)
      ? (date = new Date(parseInt(input)))
      : (date = new Date(input));
  }

  date == "Invalid Date"
    ? res.json({ error: "Invalid Date" })
    : res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.listen(port, () => console.log(`Server runnig at port ` + port));
