const bip39 = require('bip39');
const hdkey = require('hdkey');
const createHash = require('create-hash');
const checkHash = require('bs58check');

async function bitcoinHDwallet() {
    const mnemonic = bip39.generateMnemonic(); // generate string
    console.log(`mnemonic ${mnemonic}`);
    const seed = await bip39.mnemonicToSeed(mnemonic); // create seed buffer
    console.log(`seed: ${seed}`);
    const root = hdkey.fromMasterSeed(seed);
    console.log(`root ${JSON.stringify(root)}`);
    const masterPrivateKey = root.privateKey.toString('hex');

    console.log(`masterProivateKey ${masterPrivateKey}`)

    const addrssNode = root.derive("m/44'/60'/0'/0/0");
    const publicKey = addrssNode._publicKey;

    console.log(publicKey);

    const generateHash = createHash('sha256').update(publicKey).digest();
    const rmHash = createHash('rmd160').update(generateHash).digest();

    const generateBuffer = Buffer.allocUnsafe(21);

    generateBuffer.writeUInt8(0x00,0);

    rmHash.copy(generateBuffer,1);

    const checkBase = checkHash.encode(generateBuffer);

    console.log(`checkBase ${checkBase}`);
}
bitcoinHDwallet();