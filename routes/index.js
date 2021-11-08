import express from 'express';
import walletRoute from './walletRoute';

const router = express.Router();

router.use('/', walletRoute);

export default router;
