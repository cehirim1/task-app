import jwt from "jsonwebtoken";



export const generateToken = (id) => {
  return jwt.sign(
    {
      userID: id,
    },
    "verified",
    {
      expiresIn: "1h",
    }
  );
};

export const authenticateToken = (req, res, next) => {
  //verify token in header authorization
  const token = req.headers["authorization"];
  if (!token) {
    res.status(403).json({
      message: "Unauthorized",
    });
  }
  jwt.verify(token, "verified", (err, decodedToken) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "invalid token or token expired" });
    }
    //else allow and next step
    req.userID = decodedToken.userID;
    next();
  });
};
