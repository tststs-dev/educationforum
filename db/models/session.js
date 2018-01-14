/**
 * Created by Stas on 26.10.2017.
 */
const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true, //will switch to true in next sprint
        trim: true
    },
    refreshTokenHash: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps : true});

sessionSchema.index({userId: 1});

let Session = mongoose.model('Session', sessionSchema);

module.exports = Session;