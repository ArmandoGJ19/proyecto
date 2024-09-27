import User from "../models/User.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const secret = process.env.SECRET;

// Función para iniciar sesión
export const signIn = async (req, res) => { // Cambia los parámetros a (req, res)
    const { email, password } = req.body; // Extrae email y password del body

    try {
        const user = await User.findOne({ email }).populate("roles");
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        const passwordIsValid = await User.comparePassword(password, user.password);
        if (!passwordIsValid) return res.status(401).json({ message: "Contraseña incorrecta" });

        const token = tokenGenerate(user);
        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

function tokenGenerate(user) {
    const token = jwt.sign({ id: user._id, name: user.name }, secret, {
        expiresIn: 86400, // 24 horas
    });
    return token;
}
