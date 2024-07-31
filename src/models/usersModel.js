import mongoose from 'mongoose'

const UsersSchema = new mongoose.Schema({
    _id: Object,
    name: String,
    email: String,
    password: String,
})
const UsersModel = mongoose.model('users', UsersSchema)

export default UsersModel