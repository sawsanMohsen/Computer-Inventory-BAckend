const Computer = require('../models/computer.model.js');
const uuidv4 = require('uuid/v4');

// Create and Save a new Computer
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Computer name can not be empty"
        });
    }

    // Create a Computer
    const computer = new Computer({
        id: req.body.id || uuidv4(), 
        name: req.body.name,
		processor: req.body.processor, 
        ram: req.body.ram,
		hdd: req.body.hdd, 
        vga: req.body.vga,
		brand: req.body.brand, 
        model: req.body.model,
		mainboard: req.body.mainboard, 
        screen: req.body.screen,
		type: req.body.type
    });

    // Save Computer in the database
    computer.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Computer."
        });
    });
};

// Retrieve and return all computers from the database.
exports.findAll = (req, res) => {
    Computer.find()
    .then(computers => {
        res.send(computers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving computers."
        });
    });
};

// Find a single computer with a computerId
exports.findOne = (req, res) => {
    Computer.findById(req.params.computerId)
    .then(computer => {
        if(!computer) {
            return res.status(404).send({
                message: "Computer not found with id " + req.params.computerId
            });            
        }
        res.send(computer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Computer not found with id " + req.params.computerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving computer with id " + req.params.computerId
        });
    });
};

// Update a computer identified by the computerId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Computer name can not be empty"
        });
    }

    // Find computer and update it with the request body
    Computer.findByIdAndUpdate(req.params.computerId, {
        id: req.body.id || uuidv4(), 
        name: req.body.name,
		processor: req.body.processor, 
        ram: req.body.ram,
		hdd: req.body.hdd, 
        vga: req.body.vga,
		brand: req.body.brand, 
        model: req.body.model,
		mainboard: req.body.mainboard, 
        screen: req.body.screen,
		type: req.body.type
    }, {new: true})
    .then(computer => {
        if(!computer) {
            return res.status(404).send({
                message: "Computer not found with id " + req.params.computerId
            });
        }
        res.send(computer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Computer not found with id " + req.params.computerId
            });                
        }
        return res.status(500).send({
            message: "Error updating computer with id " + req.params.computerId
        });
    });
};

// Delete a computer with the specified computerId in the request
exports.delete = (req, res) => {
    Computer.findByIdAndRemove(req.params.computerId)
    .then(computer => {
        if(!computer) {
            return res.status(404).send({
                message: "Computer not found with id " + req.params.computerId
            });
        }
        res.send({message: "Computer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Computer not found with id " + req.params.computerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete computer with id " + req.params.computerId
        });
    });
};