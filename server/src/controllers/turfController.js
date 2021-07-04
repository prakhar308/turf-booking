const db = require('../models');
const turfHelper = require('../helpers/turfHelper.js');

exports.createTurf = async (req, res) => {
  try {
    // create base slots
    const slots = turfHelper.createSlots();
    const newTurf = req.body;
    newTurf.slots = slots;

    const turf = new db.Turf(newTurf);
    await turf.save();

    res.status(201).send(turf);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.getTurf = async (req, res) => {
  try {
    const id = req.params.id;
    const turf = await db.Turf.findById(id);
    res.status(200).send(turf);
  } catch (err) {
    res.status(500).send({ message: "Cannot find turf" });
  }
}

exports.getTurfs = async (req, res) => {
  try {
    const turfs = await db.Turf.find();
    res.status(200).send(turfs);
  } catch (err) {
    res.status(500).send({ message: "Cannot find turfs" });
  }
}