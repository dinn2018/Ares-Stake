import 'hardhat-deploy'
import '@nomiclabs/hardhat-ethers'
import 'hardhat-gas-reporter'
import '@typechain/hardhat'
import 'solidity-coverage'
import { HardhatUserConfig } from 'hardhat/types'

if (process.env.HARDHAT_FORK) {
	process.env['HARDHAT_DEPLOY_FORK'] = process.env.HARDHAT_FORK
}

process.env.INFURA_API_KEY = process.env.INFURA_API_KEY || 'e264a6bdfb1d492fa67505c20bffb482'

const accounts = {
	mnemonic: process.env.MNEMONIC || 'test test test test test test test test test test test junk',
}

const config: HardhatUserConfig = {
	solidity: {
		compilers: [
			{
				version: '0.7.6',
				settings: {
					optimizer: {
						enabled: true,
						runs: 200
					},
				},
			},
		],
	},
	namedAccounts: {
		deployer: 0,
		simpleERC20Beneficiary: 1
	},
	networks: {
		mainnet: {
			url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
			accounts,
			gasPrice: 30 * 1000000000,
			chainId: 1,
		},
		localhost: {
			url: 'http://127.0.0.1:8545',
			accounts,
		},
		hardhat: {
			forking: {
				enabled: process.env.FORKING === 'true',
				url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
			},
			live: false,
			chainId: 1337,
			saveDeployments: true
		},
		ropsten: {
			url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
			accounts: {
				mnemonic: 'wrist spell tomorrow cheap staff engine ready judge burden bridge battle climb'
				// address 0xa995AE28b9cFf206C3971D1887cc934FC48e3a0F
			},
			chainId: 3,
			live: true,
			saveDeployments: true,
			tags: ['staging'],
			gasPrice: 10000000000,
			gasMultiplier: 2
		},
		rinkeby: {
			url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
			accounts,
			chainId: 4,
			live: true,
			saveDeployments: true,
			tags: ['staging'],
			gasPrice: 50000000000,
			gasMultiplier: 2,
		},
		goerli: {
			url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
			accounts,
			chainId: 5,
			live: true,
			saveDeployments: true,
			tags: ['staging'],
			gasPrice: 5000000000,
			gasMultiplier: 2,
		},
		kovan: {
			url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
			accounts,
			chainId: 42,
			live: true,
			saveDeployments: true,
			tags: ['staging'],
			gasPrice: 20000000000,
			gasMultiplier: 2,
		},
		moonbase: {
			url: 'https://rpc.testnet.moonbeam.network',
			accounts,
			chainId: 1287,
			live: true,
			saveDeployments: true,
			tags: ['staging'],
			gas: 5198000,
			gasMultiplier: 2,
		},
		fantom: {
			url: 'https://rpcapi.fantom.network',
			accounts,
			chainId: 250,
			live: true,
			saveDeployments: true,
			gasPrice: 22000000000,
		},
		'fantom-testnet': {
			url: 'https://rpc.testnet.fantom.network',
			accounts,
			chainId: 4002,
			live: true,
			saveDeployments: true,
			tags: ['staging'],
			gasMultiplier: 2,
		},
		matic: {
			url: 'https://rpc-mainnet.maticvigil.com',
			accounts,
			chainId: 137,
			live: true,
			saveDeployments: true,
		},
		mumbai: {
			url: 'https://rpc-mumbai.maticvigil.com/',
			accounts,
			chainId: 80001,
			live: true,
			saveDeployments: true,
			tags: ['staging'],
			gasMultiplier: 2,
		},
		xdai: {
			url: 'https://rpc.xdaichain.com',
			accounts,
			chainId: 100,
			live: true,
			saveDeployments: true,
		},
		bsc: {
			url: 'https://bsc-dataseed.binance.org',
			accounts,
			chainId: 56,
			live: true,
			saveDeployments: true,
		},
		'bsc-testnet': {
			url: 'https://data-seed-prebsc-2-s3.binance.org:8545',
			accounts,
			chainId: 97,
			live: true,
			saveDeployments: true,
			tags: ['staging'],
			gasMultiplier: 2,
		},
		heco: {
			url: 'https://http-mainnet.hecochain.com',
			accounts,
			chainId: 128,
			live: true,
			saveDeployments: true,
		},
		'heco-testnet': {
			url: 'https://http-testnet.hecochain.com',
			accounts,
			chainId: 256,
			live: true,
			saveDeployments: true,
			tags: ['staging'],
			gasMultiplier: 2,
		},
		avalanche: {
			url: 'https://api.avax.network/ext/bc/C/rpc',
			accounts,
			chainId: 43114,
			live: true,
			saveDeployments: true,
			gasPrice: 470000000000,
		},
		fuji: {
			url: 'https://api.avax-test.network/ext/bc/C/rpc',
			accounts,
			chainId: 43113,
			live: true,
			saveDeployments: true,
			tags: ['staging'],
			gasMultiplier: 2,
		},
		harmony: {
			url: 'https://api.s0.t.hmny.io',
			accounts,
			chainId: 1666600000,
			live: true,
			saveDeployments: true,
		},
		'harmony-testnet': {
			url: 'https://api.s0.b.hmny.io',
			accounts,
			chainId: 1666700000,
			live: true,
			saveDeployments: true,
			tags: ['staging'],
			gasMultiplier: 2,
		},
		okex: {
			url: 'https://exchainrpc.okex.org',
			accounts,
			chainId: 66,
			live: true,
			saveDeployments: true,
		},
		'okex-testnet': {
			url: 'https://exchaintestrpc.okex.org',
			accounts,
			chainId: 65,
			live: true,
			saveDeployments: true,
			tags: ['staging'],
			gasMultiplier: 2,
		},
		arbitrum: {
			url: 'https://arb1.arbitrum.io/rpc',
			accounts,
			chainId: 42161,
			live: true,
			saveDeployments: true,
			blockGasLimit: 700000,
		},
		'arbitrum-testnet': {
			url: 'https://kovan3.arbitrum.io/rpc',
			accounts,
			chainId: 79377087078960,
			live: true,
			saveDeployments: true,
			tags: ['staging'],
			gasMultiplier: 2,
		},
		celo: {
			url: 'https://forno.celo.org',
			accounts,
			chainId: 42220,
			live: true,
			saveDeployments: true,
		},
	},
	paths: {
		artifacts: 'artifacts',
		cache: 'cache',
		deploy: 'deploy',
		imports: 'imports',
		sources: 'contracts',
		tests: 'test',
	},
	gasReporter: {
		currency: 'USD',
		gasPrice: 100,
		enabled: process.env.REPORT_GAS ? true : false,
		coinmarketcap: process.env.COINMARKETCAP_API_KEY,
		maxMethodDiff: 10,
	},
	typechain: {
		outDir: 'types',
		target: 'ethers-v5',
	},
	mocha: {
		timeout: 0,
	},
}

export default config
