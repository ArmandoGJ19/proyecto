import Cita from "../models/Citas.js";
import e from "express";

export const getCitas = async (req, res) => {
    try {
        const citas = await Cita.find();
       if(!citas){
        return res.status(404).json({ message: "No hay Citas" });
       }
       res.json(citas);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getCitabyId = async (req, res) => {
    try {
        const cita = await Cita.findById(req.params.id);
        if(!cita){
            return res.status(404).json({ message: "No hay Cita" });
        }
        res.json(cita);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createCita = async (req, res) => {
    try {
        const {cliente, fecha, estado, notas} = req.body;
        if(!cliente.telefono || !cliente.nombre || !fecha){
            return res.status(404).json({message: "Los campos telefono, nombre y fecha son obligatorios"});
        }
        const newCita = new Cita({
            cliente: {
                nombre: cliente.nombre,
                email: cliente.email,
                telefono: cliente.telefono,
            },
            fecha: fecha,
            estado: estado|| 'pendiente',
            notas: notas,
            user: req.userId

        });
        // guardar la cita en la base de datos
        await newCita.save();
        // devolver una respuesta exitosa
        res.status(201).json(newCita);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const updateCita = async (req, res) => {
    try {
        const { id } = req.params;

        // Actualizar la cita y devolver el documento actualizado
        const updatedCita = await Cita.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedCita) {
            return res.status(404).json({ message: "Cita no encontrada" });
        }

        res.status(200).json({message: "Cita actualizada correctamente", updatedCita});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
export const deleteCita = async (req, res) => {
    try {
        const deletedCita = await Cita.findByIdAndDelete(req.params.id);
        if (!deletedCita) {
            return res.status(404).json({ message: "No hay Cita" });
        }
        res.json({message: "Cita eliminada correctamente"});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}