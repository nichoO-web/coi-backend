const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Resources', 'Team', 'Clients', 'Hot Leads']
    },
    details: {
        type: String,
        default: [],
    },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;