# Payments for ethereum solidity smart contract

## INSTALL

```bash
yarn
```

## TEST

```
yarn test
```

## SCRIPTS

`yarn prepare`

As a standard lifecycle npm script, it is executed automatically upon install. It generate config file and typechain to get you started with type safe contract interactions
<br/><br/>

`yarn lint`, `yarn lint:fix`, `yarn format` and `yarn format:fix`

These will lint and format check your code. the `:fix` version will modifiy the files to match the requirement specified in `.eslintrc` and `.prettierrc.`
<br/><br/>

`yarn build`

These will compile your contracts
<br/><br/>

`yarn gas`

These will produce a gas report for function used in the tests
<br/><br/>

`yarn coverage`

These will produce a coverage report in the `coverage/` folder

<br/><br/>

`yarn dev`

These will run a local hardhat network on `localhost:8545` and deploy your contracts on it. Plus it will watch for any changes and redeploy them.
<br/><br/>

`yarn <network>:export`

This will export the abi+address of deployed contract to `<network>.json`
<br/><br/>
