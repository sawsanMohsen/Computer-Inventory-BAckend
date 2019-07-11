const mongoose = require('mongoose');

const ComputerSchema = mongoose.Schema({
    id: String,
    name: String,
	processor: String,
    ram: String,
	hdd: String,
    vga: String,
	brand: String,
    model: String,
	mainboard: String,
    screen: String,
	type: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Computer', ComputerSchema);