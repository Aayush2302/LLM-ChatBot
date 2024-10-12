import jwt from "jsonwebtoken";

// Function to generate a JWT with userId and role, and set it in a cookie
const generateTokenAndSetCookie = (user, res) => {
  const token = jwt.sign(
    {
      userId: user._id, // Include userId in the payload
      role: user.role, // Include role in the payload
    },
    process.env.JWT_SECRET, // Secret key to sign the JWT
    { expiresIn: "15d" } // Token expiration
  );

  // Set the token in the cookie
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true, // Makes the cookie accessible only by the web server
    sameSite: "Strict", // Controls whether the cookie is sent with cross-site requests
  });
};

export default generateTokenAndSetCookie;
