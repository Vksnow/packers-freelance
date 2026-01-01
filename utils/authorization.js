import jwt from 'jsonwebtoken'

export const Authorization = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ status: false, message: "Authorization token missing" });
  }
  const token = authHeader?.split(" ")[1];
  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) return res.status(401).json({ status: false, message: "Invalid or expired token" });
    req.user = user;
    next();
  });
};

export const AuthorizationRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).send({ messsage: "Restrict to access the Api", status: false })
    }
    next()
  }
}

export const decodeToken = (req, res, next) => {
  let token = req.cookies.token
  if (!token && req.headers?.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }
  if (!token) return res.status(401).json({ message: "Not authenticated" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    console.log(decoded);

    res.status(200).json({decoded})
  } catch (error) {
    res.status(403).json({ message: "Invalid token", success: false });

  }
}