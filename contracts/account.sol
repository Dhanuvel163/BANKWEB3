pragma solidity 0.4.25;
import './bank.sol';

contract Account{
    Bank public b1;
    constructor() public{
        // Bank b1 = new Bank();
        b1 = new Bank();
    }
    function setname() public{
        b1.setAccountName("TWOOOO");
    }
    function getname() view public returns(string memory){
        return b1.getAccountName();
    }
}