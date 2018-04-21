const Block = require("./block");
const Blockchain = require("./blockchain");

let blockchain = new Blockchain();
console.log('Minerando bloco 1...')
blockchain.addBlock(new Block(1, "20/07/2017", { amount: 100 }));

console.log('Minerando bloco 2...')
blockchain.addBlock(new Block(2, "20/07/2017", { amount: 200 }));
