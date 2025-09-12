import express from 'express';
import { readMessages, writeMessages } from '../helpers/fileHelpers.js';
import { randomUUID } from 'crypto';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const messages = await readMessages();
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }

    const messages = await readMessages();
    const newEntry = {
      id: randomUUID(),
      name,
      message
    };

    messages.push(newEntry);
    await writeMessages(messages);

    res.status(201).json(newEntry);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { name, message } = req.body;
    const { id } = req.params;

    const messages = await readMessages();
    const index = messages.findIndex(msg => msg.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Message not found' });
    }

    messages[index] = { id, name, message };
    await writeMessages(messages);

    res.json(messages[index]);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const messages = await readMessages();
    const filtered = messages.filter(msg => msg.id !== id);

    if (filtered.length === messages.length) {
      return res.status(404).json({ error: 'Message not found' });
    }

    await writeMessages(filtered);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
