import express from 'express';
import cors from 'cors';
import questions from './questions.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api', cors(), (req, res) => {
  res.json(questions);
});

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));