// /middlewares/verifySocketToken.js
import jwt from "jsonwebtoken";

export const verifySocketToken = (socket, next) => {
  try {
    // Parse cookies from handshake
    const cookies = socket.handshake.headers.cookie || "";
    let token = null;

    // Parse cookies manually (since cookieParser is Express middleware)
    if (cookies) {
      const cookieArray = cookies.split(";");
      for (let cookie of cookieArray) {
        const [name, value] = cookie.trim().split("=");
        if (name === "token") {
          token = decodeURIComponent(value);
          break;
        }
      }
    }

    // Fallback: try to get token from auth object or authorization header
    if (!token) {
      token =
        socket.handshake.auth?.token ||
        socket.handshake.headers?.authorization?.split(" ")[1];
    }

    if (!token) {
      console.warn("❌ No token provided in socket handshake");
      return next(new Error("Unauthorized: No token provided"));
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("❌ Invalid socket token:", err.message);
        return next(new Error("Invalid token"));
      }

      // Attach decoded user to socket (like req.user)
      socket.user = decoded;
      console.log("✅ Socket authenticated:", decoded.id, "Email:", decoded.email);
      next();
    });
  } catch (err) {
    console.error("❌ Socket auth error:", err.message);
    next(new Error("Authentication failed"));
  }
};
