// SPDX-License-Identifier: MIT

// This contract is used to select a random name from a list of ship names
// It is deterministic, meaning that the same seed will always produce the same name from the same seed

// by Brian Doyle
// Github: https://github.com/briandoyle81
// Twitter/X: https://x.com/random_entropy
// Warpcast: @briandoyle81

// Ship Name list license
// https://github.com/smashew/NameDatabases/blob/master/LICENSE

// This is free and unencumbered software released into the public domain.

// Anyone is free to copy, modify, publish, use, compile, sell, or
// distribute this software, either in source code form or as a compiled
// binary, for any purpose, commercial or non-commercial, and by any
// means.

// In jurisdictions that recognize copyright laws, the author or authors
// of this software dedicate any and all copyright interest in the
// software to the public domain. We make this dedication for the benefit
// of the public at large and to the detriment of our heirs and
// successors. We intend this dedication to be an overt act of
// relinquishment in perpetuity of all present and future rights to this
// software under copyright law.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
// OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
// ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.

// For more information, please refer to <http://unlicense.org>

pragma solidity ^0.8.28;

interface INamesSubset {
    function getRandomName(bytes32 _seed) external view returns (string memory);
}

contract OnchainRandomNames {
    address[] public shipNameSubsets;

    constructor(address[] memory _shipNameSubsets) {
        shipNameSubsets = _shipNameSubsets;
    }

    function getRandomShipName(
        bytes32 _seed
    ) public view returns (string memory) {
        // Hash seed first for subset selection
        bytes32 newSeed = keccak256(abi.encodePacked(_seed));
        uint256 randomIndex = uint256(newSeed) % shipNameSubsets.length;

        INamesSubset shipNameSubset = INamesSubset(
            shipNameSubsets[randomIndex]
        );

        // Hash again for name selection
        newSeed = keccak256(abi.encodePacked(newSeed));
        string memory shipName = shipNameSubset.getRandomName(newSeed);

        return shipName;
    }
}
