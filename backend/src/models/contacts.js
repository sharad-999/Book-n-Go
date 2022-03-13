const mongoose = require("mongoose");
const contact_Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})
//model is used to create collection
const Contact = new mongoose.model("Contact", contact_Schema);
module.exports = Contact;