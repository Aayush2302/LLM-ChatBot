import jwt from "jsonwebtoken";

const isAdmin = (req, res, next) => {
  try {
    // Get the token from headers or cookies
    const token =
      req.cookies?.jwt ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Decode the token to get user info (including role)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the role is 'admin'
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    // User is admin, proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default isAdmin;
