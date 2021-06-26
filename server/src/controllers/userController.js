const db = require("../models");

exports.createUser = async (req, res) => {
  try {
    const user = new db.User(req.body);
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
}

exports.loginUser = async (req, res) => {
  try {
    const user = await db.User.loginByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send({ "error": e.message });
  }
}

exports.readUser = async (req, res) => {
  res.send(req.user);
}

exports.updateUser = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save();

    res.send(req.user)
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user)
  } catch (e) {
    res.status(500).send()
  }
}