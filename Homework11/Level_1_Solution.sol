//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Level_1_Solution {
    bytes32 public answer = 0x04994f67dc55b09e814ab7ffc8df3686b4afb2bb53e60eae97ef043fe03fb829;
    uint8 public solution;

    event Guess(bytes32 _guess);

    constructor() {
        findSolution();
    }

    function findSolution() private {
        for (uint8 i=0; i<256; i++) {
            bytes32 _guess = keccak256(abi.encodePacked(i));
            if (_guess == answer) {
                solution = i;
                return;
            }
        }
    }
}
