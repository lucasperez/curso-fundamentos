const Block = require("./block");
const Blockchain = require("./blockchain");

let blockchain = new Blockchain();
blockchain.addBlock(new Block(1, "20/07/2017", { amount: 100 }));
blockchain.addBlock(new Block(2, "20/07/2017", { amount: 200 }));

console.log(blockchain)
