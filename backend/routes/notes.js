const express = require('express');
const fetchuser = require('../middleware/fethuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

const router = express.Router();

//Rote 1: Get all the notes using: GET "api/notes/fetchallnotes".Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error")
    }

})

//Rote 2: Add a new notes using: Post "/api/notes/addnote".Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //If there are errors ,return bad requiest and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error")
    }
})

//Rote 3: Update an existing note using: PUT "api/notes/updatenote".Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //Create a new note object
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        //Find the node to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error")
    }
})

//Rote 4: Delete an existing note using: Delete "api/notes/deletenote".Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        //Find the node to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }

        //Allow deletion only if user owns it
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Deletion Success", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error")
    }
})
module.exports = router 