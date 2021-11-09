const bip39 = require('bip39');
const bip32 = require('bip32');
const bitcoin = require('bitcoinjs-lib');

class BitcoinWallet {

    static getAddress(node,network) {
        return bitcoin.payments.p2sh({
            redeem: bitcoin.payments.p2wpkh({ pubkey: node.publicKey, network }),
            network,
        }).address;
    }

    static bitcoinHDwallet = async (req,res,next) => {
        try {
             const testnet = bitcoin.networks.testnet;
             console.log('testnet ',testnet);
            const mnemonic = bip39.generateMnemonic(); // generate string
            console.log('mnemonic  ',mnemonic);
            const seed = await bip39.mnemonicToSeed(mnemonic); // create seed buffer
            console.log('seed ',seed)
            const root = bip32.fromSeed(seed, testnet)
            console.log('root ',root);
            // const masterPrivateKey = root.privateKey.toString('hex');
             const account = root.derivePath("m/44'/60'/0'/0/0");
             console.log('account ', account);
             const accountXPub = account.neutered().toBase58();
             console.log('accountXPub ',accountXPub);

             const index = 5;

             const webRoot = bip32.fromBase58(accountXPub,testnet);
             console.log('webroot ',webRoot);
             const webserverChild = webRoot.derive(0).derive(index);
            console.log('webserverChild:', webserverChild);

            console.log('webserverChild address:', BitcoinWallet.getAddress(webserverChild, testnet));

             res.send(mnemonic);
        } catch (error) {
            throw new Error(error);
        }
        
    }
}

export default BitcoinWallet;
