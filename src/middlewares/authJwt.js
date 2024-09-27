import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Role from "../models/Role.js";

export const verifyToken = async (req, res, next) => {
    const secret = process.env.SECRET;
    const token = req.headers["x-access-token"];
    if (token === "null")return res.status(401).json({ message: "No Se proporcionado un token" });
    if (!token) return res.status(403).json({ message: "No token provided" });

    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "usuario no encontrado" });
    next();
}

export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next();
            return;
        }
    }
    res.status(403).json({ message: "Requiere rol de moderador!" });
}

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next();
            return;
        }
    }
    res.status(403).json({ message: "Requiere rol de administrador!" });
}
