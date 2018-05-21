const Block = require("./block");
const Transaction = require("./transaction");

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
    this.difficulty = 2
    this.pendingTransactions = []
    this.miningReward = 100
  }

  createGenesisBlock() {
    return new Block("01/01/2017", "o meu primeiro bloco", "0");
  }

  minePendingTransactions(miningRewardAddress) {
    //vou criar um bloco
    let block = new Block(Date.now, this.pendingTransactions);

    //minerando esse bloco
    block.mineBlock(this.difficulty);
    console.log("Block minerado com sucesso!!!")

    //adicionando esse bloco na cadeia
    this.chain.push(block);

    //zerando as transacoes e adicionando a transacao de recompensa
    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ]
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0
    for(const block of this.chain) {
      for(const trans of block.transactions) {
        if(trans.fromAddress === address) {
          balance -= trans.amount
        }

        if(trans.toAddress === address) {
          balance += trans.amount
        }
      }
    }
    return balance
  }
}

module.exports = Blockchain;
