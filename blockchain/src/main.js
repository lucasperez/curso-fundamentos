const Block = require("./block");
const Blockchain = require("./blockchain");
const Transaction = require("./transaction");

let blockchain = new Blockchain();
blockchain.createTransaction(new Transaction('address1', 'address2', 1000))
blockchain.createTransaction(new Transaction('address2', 'address1', 500))

console.log('ligando a mineração')
blockchain.minePendingTransactions('address3')
blockchain.minePendingTransactions('address3')

console.log('Balance do endereco 2 é: ', blockchain.getBalanceOfAddress('address2'))
console.log('Balance do endereco 3 é: ', blockchain.getBalanceOfAddress('address3'))
