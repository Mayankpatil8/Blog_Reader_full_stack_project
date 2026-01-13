import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER RECEIVED:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Your account cannot be authenticated. (No or bad header)"
        });
    }

    const token = authHeader.split(" ")[1];
    console.log("TOKEN RECEIVED:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
        console.log("DECODED USER:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("JWT VERIFY ERROR:", error.message);
        return res.status(401).json({
            success: false,
            message: "Your account cannot be authenticated. (JWT error)"
        });
    }
};

export default auth;
