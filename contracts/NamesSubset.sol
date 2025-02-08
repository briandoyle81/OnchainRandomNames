// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract NamesSubset {
    string[] public names;

    constructor(string[] memory _names) {
        names = _names;
    }

    function getRandomName(bytes32 _seed) public view returns (string memory) {
        // Hash the seed to get a random index
        uint256 randomIndex = uint256(_seed) % names.length;
        return names[randomIndex];
    }
}
