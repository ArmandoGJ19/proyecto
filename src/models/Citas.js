import {Schema, model} from "mongoose";


const citasSchema = new Schema({
    cliente: {
        nombre: String,
        email: String,
        telefono: String,
    },
    fecha: Date,
    estado: {
        type: String,
        enum: ['pendiente', 'confirmada', 'cancelada'],
        default: 'pendiente',
    },
    notas: String,
    user:[{
        ref: 'User',
        type: Schema.Types.ObjectId
    }]
})
export default model('Citas', citasSchema)