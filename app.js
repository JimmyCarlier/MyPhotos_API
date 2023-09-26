const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = 3000;
const userRoute = require("./routes/userRoute");
const photoRoute = require("./routes/photoRoute");

// Connect package with express
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/user", userRoute);
app.use("/file", photoRoute);

// If connection lost
app.use((req, res) => {
  res.status(404).json({});
});

// Init express on define port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
