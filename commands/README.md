# Commands

Use these commands to play with RKats.

YOU MUST compile the smart contracts in the project
main folder.

## Install

Install `rskcli` command tools, globally:

```
npm install -g rskclitools
```

## Setting a Host

### Using Ganache

Launch your `ganache` local node in other process.

Then, execute:

```
rskcli sethost ganache
rskcli setaccount root 0
```

Now, the `root` account is one of the `ganache` public
accounts, with enough balance to execute the next commands.

### Using RSK Regtest

Launch your `rsk` local node in other process.

Then, execute:

```
rskcli sethost regtest
rskcli setaccount root 0
```

Now, the `root` account is one of the `rsk` public
accounts, with enough balance to execute the next commands.

### Using RSK Testnet

To use RSK Testnet public node, execute:

```
rskcli sethost testnet
rskcli newaccount root
```

Alternatively, if you have a local node already synchronized with RSK Tesnet, execute:

```
rskcli sethost local
rskcli newaccount root
```

Then, use the [RSK Testnet Faucet](https://faucet.rsk.co/) to
get initial funding in `RBTC`.

## Deploy and Initialize RKats

Now, having defined a host and a `root` account with
funds, execute:

```
rskcli deploy root rkat RKat ..
```

This command deploy an instance of `RKat` smart contract.

Now, initialize the genesis rkats:
```
rskcli execute initialize
```

## Render RKat

To render an rkat by id:

```
rskcli execute render <number>
```

Example:

```
rskcli execute render 17
```

The description of the rkat is retrieved (ie `0xff06000000`)
and a file (ie `0xff06000000.png`) is generated and opened.

