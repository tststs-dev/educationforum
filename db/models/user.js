/**
 * Created by Stas on 26.10.2017.
 */
const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true,
        trim: true
    },
    confirmed : {
        type: Boolean,
        required: true,
        trim: true,
        default: false
    }
}, {timestamps : true});

userSchema.index({email: -1});

let User = mongoose.model('User', userSchema);

module.exports = User;