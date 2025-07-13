// server/src/controllers/bugController.js
exports.createBug = async (req, res) => {
  const { title, description } = req.body;

  //  Bug: skip validation
  // if (!title || !description) return res.status(400).json({ error: 'Title and description required' });

  const bug = await Bug.create({ title, description, status: 'open' });
  res.status(201).json(bug);
};
