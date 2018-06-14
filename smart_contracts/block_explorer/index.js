if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/aNkL1V9l638Nn8duTWj1"));
}

MAXSIZE = 10
var latestBlockNumber

function getLatestBlocks() {
  
  $("#blocos tbody tr").remove(); 

  web3.eth.getBlockNumber(function(error, result){

    latestBlockNumber = result
    latestBlockNumberMinus10 = latestBlockNumber - MAXSIZE;

    for(i=latestBlockNumber; i > latestBlockNumberMinus10; i--) {
      web3.eth.getBlock(i, function(error, block) {
        printBlock(block)
      }) 
    }
  })
}

function printBlock(block) {
  console.log(block)
  blockNumber = block.number
  hash = block.hash
  timestamp = new Date(block.timestamp * 1000)
  transactionSize = block.transactions.length
  $("#blocos tbody").append("<tr><td>"+blockNumber+"</td><td>"+hash+"</td><td>"+timestamp+"</td><td>"+transactionSize+"</td></tr>")
}

getLatestBlocks()
window.setInterval('getLatestBlocks()', 8000);


// web3.eth.filter('latest', function(error, result){
//   if (!error)

//     web3.eth.getBlock(result, function(error, block) {
//       // console.log("aaaaa", block)
//       printBlock(block)
//     }) 
// });