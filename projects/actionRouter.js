const express = require('express');
const db = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req,res) => {
    db.get()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "Project actions could not be retrieved."
            });
        });
});


router.post('/', validateAction, (req,res) => {
    const action = req.body;

    db.insert(action)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(error => {
        console.log(error);
        res.status(500).json({error: "There was an error while saving the project to the database"  })   
        });
});

router.put('/:id', validateId,  (req,res) => {
    const id = req.params.id;
    const action = req.body;

    db.update(id,action)
        .then( update => {
            res.status(200).json(update)
        })
        .catch(err => {
            console.log(error);
            res.status(500).json({ error: "There was an error while saving the action information" });
        });

});

router.delete('/:id', validateId, validateAction, (req,res) => {
    const id = req.params.id;

    db.remove(id)
        .then(remove => {
                res.status(200).json({ message: 'project was successfully deleted', remove})
        })
        .catch(error => {
            res.status(500).json({
                error: "Error encountered while deleting action"
            })
        })
})

// Middleware

function validateId (req,res,next){
    const id = req.params.id;

    db.get(id)
        .then(action => {
            if(action){
                req.action = action
                next()
            }
            else {
                res.status(400).json({
                    message: "invalid id"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "could not find action information"
            })
        })
}

function validateAction(req,res,next){
    if(Object.keys(req.body).length > 0){
        if(req.body.project_id && req.body.description && req.body.notes){
            next();
        } else {
            res.status(400).json({
                message: "missing required fields: name, description, notes"
            })
        }
    } else {
        res.status(400).json({
            message: "missing action information"
        })
    }
}



module.exports = router;