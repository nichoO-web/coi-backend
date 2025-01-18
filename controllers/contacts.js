const Contact = require('../models/contact');
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token');

router.get('/', async (req, res) => {
    try {
        const foundContacts = await Contact.find();
        res.status(200).json(foundContacts);
    } catch (err) {
        error.message = 'failed to complete request';
    }
});

router.use(verifyToken);

router.post('/', async (req, res) => {
    try {
        const createdContact = await Contact.create(req.body);
        res.status(201).json(createdContact);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
});

router.get('/:contactId', async (req, res) => {
    try {
        const foundContact = await Contact.findById(req.params.contactId);
        if (!foundContact) {
            res.status(404);
            throw new Error('Contact not found.');
        }
        res.status(200).json(foundContact);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: 'Contact not found.' });
        } else {
            res.status(500).json({ err: 'failed to complete request' })
            console.log(err);
        }
    }
});

router.delete('/:contactId', async (req, res) => {
    try {
        const deleteContact = await Contact.findByIdAndDelete(req.params.contactId);
        if (!deleteContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(deleteContact);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: 'Contact not found' });
        } else {
            res.status(500).json({ message: 'failed to complete request' });
        }
    }
});

router.put('/:contactId', async (req, res) => {
    try {
        const updateContact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {
            new: true,
        });
        if (!updateContact) {
            res.status(404);
            throw new Error('Contact not found');
        }
        res.status(200).json(updateContact);
    } catch (err) {
        if (req.statusCode === 404) {
            res.json({ err: 'Contact not found'})
        } else {
            req.status(500).json({ err: 'failed to complete request' });
        }
    }
});

module.exports = router;