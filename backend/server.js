import express from 'express';
import cors from 'cors';

import messagesRouter from './routes/messagesRouter.js'; 
import path from "path";



const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

console.log(path.join(import.meta.dirname, "/dist"));
console.log(path.join(import.meta.dirname, "/dist/index.html"));

app.use('/messages', messagesRouter);
app.use("/", express.static(path.join(import.meta.dirname, "/dist")));
app.get(/.*/, (req, res) => res.sendFile(path.join(import.meta.dirname, "/dist/index.html")));


app.use((req, res) => {
  res.status(404).json({ error: 'Page not found' });
});


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
