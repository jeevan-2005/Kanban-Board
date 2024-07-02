const express = require("express");
const connection = require("./config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const taskRouter = require("./routes/task.routes");

const refreshTokenSecretKey = process.env.R_TOKEN_SECRET_KEY;
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

app.post("/token", (req, res) => {
  let refreshToken = req.headers.authorization.split(" ")[1];
  if (!refreshToken) {
    return res.status(500).send("You are not authenticated");
  }
  jwt.verify(refreshToken, refreshTokenSecretKey, (err, decoded) => {
    if (err) return res.send("Invalid Refresh token, Please Login again!");
    console.log(decoded);
    let user = decoded._doc;
    let acessToken = jwt.sign({ ...user }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
    res.status(200).send({ acessToken: acessToken });
  });
});

app.get("/health-check", (req, res) => {
  res.send("health-check server is running fine");
});

app.listen(port, async () => {
  try {
    await connection;
    console.log(`DB is connected and server is running at Port:${port}`);
  } catch (error) {
    console.log(error);
  }
});