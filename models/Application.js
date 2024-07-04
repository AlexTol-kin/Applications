const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
  patient: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Application = mongoose.model("Applications", NoteSchema);

module.exports = Application;
