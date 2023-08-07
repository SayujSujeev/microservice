const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.header("Authorization");
  console.log(token);
  console.log(process.env.JWT_SECRET);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Pass control to the next middleware function
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
    console.log(err);
  }
}

module.exports = authenticate;
