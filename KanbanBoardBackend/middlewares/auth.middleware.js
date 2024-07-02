const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.send({msg: `token not found, Please Login again.`});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.userId = decoded._id;
    next();
  } catch (err) {
    res.status(401).send({ msg: "Token is not valid" });
  }
};

module.exports = auth;
