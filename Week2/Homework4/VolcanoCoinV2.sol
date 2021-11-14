// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract VolcanoCoin {
    uint public totalSupply = 10000;
    address owner;
    mapping(address => uint) public balances;
    mapping(address => Payment[]) public payments;

    struct Payment {
        uint amount;
        address recipient;
    }

    event TotalSupplyChanged(uint totalSupply);
    event Transfer(address sender, address recipient, uint amount);

    constructor() {
        owner = msg.sender;
        // Send all of the tokens to the owner.
        balances[owner] = totalSupply;
    }

    modifier onlyOwner {
        if(msg.sender == owner) {
            _;
        }
    }

    function increaseTotalSupply() public onlyOwner {
        totalSupply += 1000;
        emit TotalSupplyChanged(totalSupply);
    }

    function transfer(uint _amount, address _recipient) public {
        require(_recipient != address(0), "Can not transfer to the burn address.");
        require(_amount <= balances[msg.sender], "Insufficient funds.");

        balances[msg.sender] -= _amount;
        balances[_recipient] += _amount;

        emit Transfer(msg.sender, _recipient, _amount);
        payments[msg.sender].push(Payment(_amount, _recipient));
    }
}
