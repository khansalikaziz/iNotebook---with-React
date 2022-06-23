const jwt = require("jsonwebtoken");

const JWT_SECRET = "Salikisagoodb$boy";
const fetchuser = (req, res, next) => {
  //Get user from jwt token and add id to req object
  const token = req.header("auth-token");
  try {
    if (!token) {
      res
        .status(401)
        .send({ error: "Please authenticate using a valid token" });
    }
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;

    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
