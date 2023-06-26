import express from 'express';
import compression from 'compression';

import v1 from './v1';
import auth from './auth';

import useUtils from './composables/useUtils';
import authenticate from './middlewares/authenticate';

const PORT = 3000;
const app = express();

const { sendResponse } = useUtils();

app.use(compression());
app.use(express.json());

app.use(function (req, _, next) {
  console.log('🚥 %s %s', req.method, req.path);
  next();
});

// Endpoints to handle login, register and token refresh.
app.use('/api/auth/', auth);

// TODO
app.use('/api/v1/', authenticate, v1);

app.use('/api/status/', (_, res) => {
  sendResponse(res, { message: "Hi it's Gigz API !" }, 200);
});

app.listen(PORT, () => console.log(`🚀 API listening on port ${PORT}`));
