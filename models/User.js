const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true},
    password: { type: String, required: true, minlength:8 },
    role: { type: String, enum: ['user', 'admin'], default:'user'},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
    }

}, {timestamps: true});

module.exports = mongoose.model('user', userSchema);