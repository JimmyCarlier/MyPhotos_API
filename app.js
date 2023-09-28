const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const path = require("path");
const port = 3000;
const userRoute = require("./routes/userRoute");
const photoRoute = require("./routes/photoRoute");
const cguRoute = require("./routes/cguRoute");

// Connect package with express
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/user", userRoute);
app.use("/file", photoRoute);
app.use("/cgu", cguRoute);

// If connection lost
app.use((req, res) => {
  res.status(404).json({});
});

// Init express on define port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
