const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let taskSchema = new Schema({
    task: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);