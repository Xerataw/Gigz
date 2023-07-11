import { rateLimit } from 'express-rate-limit';

const pictureRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
});

export default pictureRateLimiter;
