import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
        required: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    bio: {
        type: String,
        default: '',
        trim: true

    },
    avatar: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
},{timestamps: true})


//yaha per cluster modl name nahi pass are to usi liye humne user likha hai
const User = mongoose.model('User', userSchema, "users");

export default User;