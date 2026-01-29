import cors from 'cors';
import express from 'express';
import '#db';
import { CLIENT_BASE_URL } from '#config';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: CLIENT_BASE_URL }));
app.use(express.json());

app.get('/', (req, res) => res.send('RestAPI is running'));

app.use('/*splat', (_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
