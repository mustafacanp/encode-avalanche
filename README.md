# encode-avalanche

Encode Avalanche Bootcamp

## Helper Scripts

```sh
npm init -y
yarn add -D hardhat
npx hardhat
yarn add ethers
yarn add -D "hardhat@^2.7.0" "@nomiclabs/hardhat-waffle@^2.0.0" "ethereum-waffle@^3.0.0" "chai@^4.2.0" "@nomiclabs/hardhat-ethers@^2.0.0" "ethers@^5.0.0"

yarn add @openzeppelin/contracts
yarn add -D @openzeppelin/test-helpers


npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
npx hardhat run scripts/deploy.js --network hardhat // Get network from hardhat.config.js

npx hardhat test --network hardhat

```
