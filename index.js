const blockchain = require('./blockchain');

blockchain.initBlockchain();
blockchain.addnewBlock('New block has been added');
blockchain.addnewBlock('Block number 2 has been added');
blockchain.addnewBlock('Block number 3 has been added');

console.log(blockchain.getAllBlocks());
