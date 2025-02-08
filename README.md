# Onchain Random Names

This contract is free to use, but I'll gladly accept tips at: 0xac5b774D7a700AcDb528048B6052bc1549cd73B9

This set of contracts allows anyone to generate random names from a list of firstnames and lastnames onchain.

The firstnames and lastnames are stored in the contract as a list of strings.

The contract uses a deterministic algorithm to generate a random index from the list of firstnames and lastnames. It is deterministic, meaning that the same seed will always produce the same name from the same seed.

## Deployed Address

EVM on Flow Testnet: https://evm-testnet.flowscan.io/address/0xe26B2E42892a5C2Cd43CE38DDa0b38547CF35464?tab=read_write_contract
EVM on Flow Mainnet: https://evm.flowscan.io/address/0x72ae7d588dec0Ff4E7b0ABf32aDc2b33e868AE66?tab=read_write_contract

## Usage

To use, simply call the `getRandomName` function with a `bytes32` seed.

IE: 0x6636313932303132383935653232313434333441653944433144353536374675

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
