/*
        This is a file which defines
        the structure of ur data which is stored in the database file.
*/


const mongoose = require("mongoose");

const taskmanage = new mongoose.Schema({
    title : String,
    isCompleted : Boolean,
});

const Task = mongoose.model("Task" , taskmanage);

module.exports = { Task };