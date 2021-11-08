const bip39 = require('bip39');
import hdkey from 'hdkey';
import createHash from 'create-hash';
import checkHash from 'bs58check';
import bitcoin from 'bitcoinjs-lib';

class BitcoinWallet {
    testnet = bitcoin.networks.testnet;
    static bitcoinHDwallet = async (req,res,next) => {
        try {
            const mnemonic = bip39.generateMnemonic(); // generate string
            console.log('mnemonic  ',mnemonic)
            const seed = await bip39.mnemonicToSeed(mnemonic); // create seed buffer
            const root = hdkey.fromMasterSeed(seed);
            // const masterPrivateKey = root.privateKey.toString('hex');
             const addrssNode = root.derive("m/44'/60'/0'/0/0");
             const publicKey = addrssNode._publicKey;
            console.log(publicKey);
            const generateHash = createHash('sha256').update(publicKey).digest();
            const rmHash = createHash('rmd160').update(generateHash).digest();
            const generateBuffer = Buffer.allocUnsafe(21);
            const data = generateBuffer.writeUInt8(0x00,0);
            console.log('data : ',data);
            rmHash.copy(generateBuffer,1);
    
            const checkBase = checkHash.encode(generateBuffer);
    
            console.log(`checkBase ${checkBase}`);
             res.send(mnemonic);
        } catch (error) {
            throw new Error(error.message);
        }
        
    }
}

export default BitcoinWallet;
