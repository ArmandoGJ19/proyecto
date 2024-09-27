import bcrypt from 'bcrypt';
import {Schema, model} from "mongoose";

const userSchema = new Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    roles:[
        {
            ref: 'Role',
            type: Schema.Types.ObjectId
        }
    ]
},{
    versionKey: false
})
// metodo para encriptar la contraseña
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
// metodo para comparar la contraseña
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}

export default model('User', userSchema)