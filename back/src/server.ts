import express from 'express';

import v1 from './v1';

const PORT = 3000;
const app = express();

app.use(express.json());

app.use(function (req, _, next) {
  console.log('🚥 %s %s', req.method, req.path);
  next();
});

app.use('/api/v1/', v1);

app.listen(PORT, () => console.log(`🚀 API listening on port ${PORT}`));
