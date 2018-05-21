window.addEventListener('load', function() {

  console.log(window.web3)
  // Check if Web3 has been injected by the browser:
  if (typeof window.web3 !== 'undefined') {
    // You have a web3 browser! Continue below!
    iniciaAplicacao(web3);
  } else {
     // Warn the user that they need to get a web3 browser
     // Or install MetaMask, maybe with a nice graphic.
     console.log("deu ruim...")
  }

})

function iniciaAplicacao(web3) {
  var vaquinhaContract 
  var contratoId = "0x03B7c45CDb4Af710eF488167fffFD699df256328"
  var abi = JSON.parse('[{"anonymous":false,"inputs":[{"indexed":false,"name":"doador","type":"address"},{"indexed":false,"name":"valor","type":"uint256"}],"name":"UsarMetodoDoar","type":"event"},{"constant":false,"inputs":[],"name":"cancelar","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"desiste","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"doador","type":"address"},{"indexed":false,"name":"valor","type":"uint256"}],"name":"DoacaoFeita","type":"event"},{"constant":false,"inputs":[],"name":"doar","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"resgata","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_assunto","type":"string"},{"name":"_beneficiario","type":"address"},{"name":"_meta","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[],"name":"assunto","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"beneficiario","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"doadores","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"meta","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"saldos","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]')

  var vaquinha = web3.eth.contract(abi).at(contratoId)

  populandoDadosDaTela(vaquinha)
  
  registrarEventos(vaquinha)


  $("#doar").click(function(){
    console.log("cliquei no botão de doarrrrrr")

    contaRemetente = $("#doarRemetente").val()
    valor = web3.toWei($("#valor").val())

    vaquinha.doar({from: contaRemetente, value: valor, gas: 210000}, function (erro, resultado) {
      toastr.info('Recebemos a sua doação. Assim que a sua doação for confirmada você será notificado')
      console.log(resultado)
      console.log(erro)
    });
  })

  $("#desistir").click(function(){
    console.log("cliquei no botão de desistir")

    contaRemetente = $("#desistirRemetente").val()

    vaquinha.desiste({from: contaRemetente, gas: 210000}, function (erro, resultado) {
      console.log(resultado)
      console.log(erro)
    });
  })
}

function populandoDadosDaTela(vaquinha) {
  populaAssunto(vaquinha)
  $("#itensDaVaquinha").html("")
  populaMeta(vaquinha)
  populaSaldo(vaquinha)
  populaDono(vaquinha)
  populaDestinatario(vaquinha)
}

function populaAssunto(vaquinha) {
  vaquinha.assunto(function(erro, resposta){
    $("#subject").html("Assunto: "+ resposta)
  })
}

function populaMeta(vaquinha){
  vaquinha.meta(function(erro, resposta){
    textoMeta = "<li>Meta: "+web3.fromWei(resposta.toNumber(), 'ether')+" ETH</li>"  
    $("#itensDaVaquinha").append(textoMeta)
  })
}

function populaSaldo(vaquinha){
  vaquinha.getBalance(function(erro, resposta){
    textoSaldo = "<li>Saldo Atual: "+web3.fromWei(resposta.toNumber(), 'ether')+" ETH</li>"
    $("#itensDaVaquinha").append(textoSaldo)
  })
}

function populaDono(vaquinha) {
  vaquinha.beneficiario(function(erro, resposta){
    textoDono = "<li>Beneficiario: "+resposta+"</li>"
    $("#itensDaVaquinha").append(textoDono)
  })
}

function populaDestinatario(vaquinha) {
  vaquinha.beneficiario(function(erro, resposta){
    $("#doarDestinatario").val(resposta)
  })
}

function registrarEventos(vaquinha) {
  // Escutar um evento
  var evento = vaquinha.DoacaoFeita({}, {});
  // Escutando evento
  evento.watch(function(erro, evento){
    if (!erro)
      console.log("escutei o evento", evento);
      toastr.success('Doação recebida com sucesso !!!')
      populandoDadosDaTela(vaquinha)
  });
}