const sha256 = require('js-sha256').sha256;

function blockchain() {
    const blocks = [];

    const getLastHash = (blocks) => blocks.slice(-1)[0];

    const isHashValid = (hash) => hash.startsWith('0000');

    function addnewBlock(data) {
        const index = blocks.length;
        const prevHash = getLastHash(blocks);
        hashBlock(data,new Date(), prevHash, index);
    }

    const getAllBlocks = () => blocks;

    function initBlockchain() {
        const data =  'Hello World';
        const timestamp = new Date();
        const prevHash = 0;
        const index = 0;
        hashBlock(data,timestamp,prevHash,index);
    }

    const hashBlock = (data,timestamp,prevHash,index) => {
        let hash = '', nonce = 0

        while(!isHashValid(hash)) {
            let input = `${data}${timestamp}${prevHash}${index}${nonce}`;
            hash = sha256(input);
            nonce +=1;
        }
        console.log(nonce);
        blocks.push(hash);
    }

    return {
        initBlockchain,
        getLastHash,
        blocks,
        getAllBlocks,
        addnewBlock
    }
}

blockchain();

module.exports = blockchain();
