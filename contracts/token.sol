pragma solidity 0.4.25;

//0x5B38Da6a701c568545dCfcB03FcB875f56beddC4 -1
//0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2 -2
contract Token{
    uint public tokenSupply = 0;
    mapping(address => uint) public balance;
    event Transfer(
        address from,
        address to,
        uint value
    );
    function add(uint value) public {
        tokenSupply+=value;
        balance[msg.sender]+=value; 
    }
    function transfer(address to, uint value) public {
        require(balance[msg.sender]>=value);
        balance[msg.sender] -= value;
        balance[to] += value;
        emit Transfer(msg.sender,to,value);
    }
}