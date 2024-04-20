const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');

// Route 1: Fetch all notes using: GET "/api/notes/fetchallnotes". Login required!
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Unexpected error!"});
    }

})

// Route 2: Add a new note using: POST "/api/notes/addnote". Login required!
router.post('/addnote', [
    body('title', "Title is required").isLength({ min: 1 }),
    body('description', "Description is required").exists()
], fetchuser, async (req, res) => {
    const result = validationResult(req);

    //Return error array if invalid data is sent
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    try {
        const note = await Notes.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description? req.body.description: "No description",
            tag: req.body.tag? req.body.tag: "General"
        })
        res.status(201).json(note);
    }


    catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Unexpected error!"});
    }
})

// Route 3: Updating a note using: PUT "/api/notes/updatenote". Login required!
router.put('/updatenote/:id', [
    body('title', "Title is required").isLength({ min: 1 }),
    body('description', "Description is required").exists(),
    body('tag', "Tag is required").exists()
],fetchuser, async (req, res) => {

    const result = validationResult(req);

    //Return error array if invalid data is sent
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    try {
        const { title, description, tag } = req.body;

        //create new note and find fields to update
        let newNote = {}
        if (title) { newNote.title = title }
        description ? newNote.description = description : newNote.description = "No description"
        tag ? newNote.tag = tag : newNote.tag = "General"


        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).json({error: "Not found!"});
        }

        if (note.user.toString() !== req.user.id) {
            req.status(401).send({error: "Not allowed!"});
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

        res.status(201).json(note);
    }


    catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Unexpected error!"});
    }
})


// Route 4: Deleting a note using: DELETE "/api/notes/deletenote". Login required!
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {

        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).json({error: "Not found!"});
        }

        if (note.user.toString() !== req.user.id) {
            req.status(401).json({error: "Not allowed!"});
        }

        note = await Notes.findByIdAndDelete(req.params.id)

        res.status(200).json({ success: "Note has been deleted", note });
    }


    catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Unexpected error!"});
    }
})

module.exports = router