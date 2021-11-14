// SPDX-License-Identifier: MIT
// https://rinkeby.etherscan.io/tx/0x7cfe955c066ee2e3856b73a54a36d089c6fa030604cc2de80ebd1817e3abfd4a
// Contract Address: 0x2d8df1e91bfcb9c43c223834465d27e8737ded86

pragma solidity ^0.8.0;

contract Score {
    uint score;
    address owner;

    event NewScore(uint _newScore);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        if(msg.sender == owner) {
            _;
        }

    }

    function getScore() public view returns(uint) {
        return score;
    }

    function setScore(uint _score) public onlyOwner {
        score = _score;

        emit NewScore(score);
    }
}
