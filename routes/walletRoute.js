import express from 'express';

import BitcoinWallet from '../controller/mnemonic';

const router = express.Router();

router.get('/generatemnemonic',BitcoinWallet.bitcoinHDwallet);

export default router;
