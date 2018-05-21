pragma solidity ^0.4.16;

contract Vaquinha {
    string public assunto;
    address public beneficiario;
    uint public meta;
    mapping(address => uint) public saldos;
    address[] public doadores;
    event DoacaoFeita(address doador, uint valor);
    event UsarMetodoDoar(address doador, uint valor);
    
    function Vaquinha(string _assunto, address _beneficiario, uint _meta) public {
        assunto = _assunto;
        beneficiario = _beneficiario;
        meta = _meta;
    }
    
    function getBalance() public view returns(uint) {
        return this.balance;
    }
    
    function doar() payable public {
        require(beneficiario != msg.sender);

        uint valorEfetivo = msg.value;
        
        if (this.balance > meta) {
            uint excedente = this.balance - meta;
            valorEfetivo = msg.value - excedente;
            msg.sender.transfer(excedente);
        }

        saldos[msg.sender] += valorEfetivo;
        doadores.push(msg.sender);
        DoacaoFeita(msg.sender, valorEfetivo);

        if (excedente > 0 || this.balance == meta) {
            _resgata();
        }
    }
    
    function () payable public {
        msg.sender.transfer(msg.value);
        UsarMetodoDoar(msg.sender, msg.value);
    }
    
    modifier somenteBeneficiario() {
        require(msg.sender == beneficiario);
        _;
    }
    
    function desiste () public
    {
        uint saldo = saldos[msg.sender];
        saldos[msg.sender] = 0;
        msg.sender.transfer(saldo);
    }
    
    function _resgata() private {
        selfdestruct(beneficiario);
    }
    
    function resgata() somenteBeneficiario public {
        _resgata();
    }
    
    function cancelar() somenteBeneficiario public {
        for(uint i; i < doadores.length; i++) {
            address doador = doadores[i];
            uint saldo = saldos[doador];
            saldos[doador] = 0;
            doador.transfer(saldo);
        }
        selfdestruct(beneficiario);
    }
    
}

// "comprar um iate","0xdd870fa1b7c4700f2bd7f44238821c26f7392148", "5000000000000000000"