pragma solidity 0.4.25;

contract Bank{
    int public bal;
    string public accountName;

    constructor() public{
        bal = 1;
    }

    function getBalance() view public returns(int){
        return bal;
    }

    function deposit(int amt) public {
        bal = bal + amt;
    }

    function withdraw(int amt) public {
        bal = bal - amt;
    }

    function withdrawHighGas(int amt) public {
        for (int i=0;i<amt;i++){
            bal = bal - 1;
        }
    }

    function setAccountName(string memory name) public{
        accountName = name;
    }
}