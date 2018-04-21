const Block = require("./block");

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
    this.difficulty = 5
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2017", "o meu primeiro bloco", "0");
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.chain[this.chain.length - 1].hash
    newBlock.hash = newBlock.calculateHash()
    newBlock.mineBlock(this.difficulty)
    this.chain.push(newBlock)
  }
}

module.exports = Blockchain;
