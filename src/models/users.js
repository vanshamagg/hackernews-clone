let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
    },
    phone: {
        type: String,
        required: true,
        unique: false,
    },
    id : {
        type: Number,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model("user", userSchema);
