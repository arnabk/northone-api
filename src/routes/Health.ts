import express from 'express';

const router = express.Router();

router.get('/health', function (req, res, next) {
  res.send(200);
});

export default router;
