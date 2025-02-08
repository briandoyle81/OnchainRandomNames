# Onchain Random Names

This set of contracts allows anyone to generate random names from a list of firstnames and lastnames onchain.

The firstnames and lastnames are stored in the contract as a list of strings.

The contract uses a deterministic algorithm to generate a random index from the list of firstnames and lastnames. It is deterministic, meaning that the same seed will always produce the same name from the same seed.

## Deployed Address

EVM on Flow Testnet:
EVM on Flow Mainnet:

## Usage

This contract is free to use, but I'll gladly accept tips at: 0xac5b774D7a700AcDb528048B6052bc1549cd73B9

To use, simply call the `getRandomName` function with a `bytes32` seed.

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/OnchainRandomNames.ts
```

## Names List License

https://github.com/smashew/NameDatabases/blob/master/LICENSE

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org>
