import User from "../models/User.js";
import Role from "../models/Role.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Cita from "../models/Citas.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.aggregate([{
            $lookup: {
                from: "roles",
                localField: "roles",
                foreignField: "_id",
                as: "roles"
            }
        }
        ]);

        res.json(users);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

        const userIdExists = await User.findById(id);
        if (!userIdExists) return res.status(404).send(`No user with id: ${id}`);
        const user = await User.aggregate([
            {
                $lookup: {
                    from: "roles",
                    localField: "roles",
                    foreignField: "_id",
                    as: "roles",
                },
            },
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
        ]);

        res.json(user);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    try {
        const { name, lastname, email, password, roles } = req.body;
        const newUser = new User({ name, lastname, email, password: await User.encryptPassword(password) });
        if (req.body.roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            if (foundRoles.length === 0) {
                return res.status(400).json({ message: "El rol del usuario no fue encontrado." });
            }
            newUser.roles = foundRoles.map(role => role._id);
        }else{
            const role = await Role.findOne({ name: "user" });
            newUser.roles = [role._id];
        }
        const savedUser = await newUser.save();
        return res.status(200).json({
            message: "Usuario creado.",
            studentId: savedUser._id,
            user: savedUser
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "No hay usuario" });
        }
        res.json({message: "Usuario eliminado"});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const updatedUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Actualizar la cita y devolver el documento actualizado
        const updatedUser = await Cita.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "usuario no encontrado" });
        }

        res.status(200).json({message: "Usuario actualizado correctamente", updatedUser});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}