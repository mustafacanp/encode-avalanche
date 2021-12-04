// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// https://rinkeby.etherscan.io/address/0x67115145B19d032029099aA2E7Ff224Cff3D6192
// Works on Remix, another way to do it is downloading Ownable.sol,
// ERC20.sol, and other related files and importing them from there.
import "@openzeppelin/contracts@4.3.3/access/Ownable.sol";
import "@openzeppelin/contracts@4.3.3/token/ERC20/ERC20.sol"; 

contract VolcanoCoin is Ownable, ERC20 {
    mapping(address => Payment[]) public payments;

    struct Payment {
        uint amount;
        address recipient;
    }

    event TotalSupplyChanged(uint totalSupply);
    event PaymentCompleted(address sender, address recipient, uint amount);

    constructor() ERC20("VolcanoCoin", "VCN") {
        uint initialSupply = 10000;
        _mint(msg.sender, initialSupply);
    }

    function increaseTotalSupply(uint amount) public onlyOwner {
        _mint(msg.sender, amount);
        emit TotalSupplyChanged(amount);
    }
    

    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20)
    {
        super._afterTokenTransfer(from, to, amount);
        payments[from].push(Payment(amount, to));
        emit PaymentCompleted(from, to, amount);
    }
}
