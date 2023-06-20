import express from 'express';

import v1 from './v1';
import authenticate from './middlewares/authenticate';

const PORT = 3000;
const app = express();

app.use(express.json());

app.use(function (req, _, next) {
  console.log('🚥 %s %s', req.method, req.path);
  next();
});

app.use('/api/v1/', authenticate, v1);

app.use('/api/status/', (_, res) => {
  res.json({
    status: 200,
    message: 'Welcome to the gigz API!',
  });
});

app.listen(PORT, () => console.log(`🚀 API listening on port ${PORT}`));
