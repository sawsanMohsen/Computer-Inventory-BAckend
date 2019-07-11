module.exports = (app) => {
    const computers = require('../controllers/computer.controller.js');

    // Create a new computer
    app.post('/computers', computers.create);

    // Retrieve all computers
    app.get('/computers', computers.findAll);

    // Retrieve a single computer with computerId
    app.get('/computers/:computerId', computers.findOne);

    // Update a computer with computerId
    app.put('/computers/:computerId', computers.update);

    // Delete a computer with computerId
    app.delete('/computers/:computerId', computers.delete);
}