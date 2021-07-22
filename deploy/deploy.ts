import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction, DeploymentsExtension } from 'hardhat-deploy/types'

import token from '../artifacts/contracts/Token.sol/Token.json'
import reward from '../artifacts/contracts/AresReward.sol/AresReward.json'
import stake from '../artifacts/contracts/AresStake.sol/AresStake.json'

const TokenConrtactName = 'Token'
const AresStakeContractName = 'AresStake'
const AresRewardContractName = 'AresReward'

const deployFuc: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {

	const { deployments, getNamedAccounts, ethers} = hre
	const { deployer } = await getNamedAccounts()
	console.log('deployer', deployer)

	const tokenAddr = await deplopyToken(deployer, deployments)

	const stake60DAddr = await deplopyStake60D(deployer, tokenAddr, deployments)

	const reward60DAddr = await deplopyReward60D(deployer, stake60DAddr, tokenAddr, deployments)

	const stakeFactory = await ethers.getContractFactory(AresStakeContractName)
	const stakeFunctions = stakeFactory.attach(stake60DAddr).functions
	const setReward60DTX = await stakeFunctions.setRewardPool(reward60DAddr)
	console.log('setReward60DTX', setReward60DTX)
	const setReward60DTXReceipt = await setReward60DTX.wait()
	console.log('setReward60DTX receipt', setReward60DTXReceipt)

}

async function deplopyToken(deployer: string, deployments: DeploymentsExtension): Promise<string> {
	 await deployments.deploy(TokenConrtactName, {
		from: deployer,
		contract: token,
		args: [ deployer ],
		log: true,
	})
	const deployResult = await deployments.get(TokenConrtactName)
	const tokenAddr = deployResult.address
	return tokenAddr
}

async function deplopyStake60D(deployer: string, tokenAddr: string, deployments: DeploymentsExtension): Promise<string> {
	await deployments.deploy(AresStakeContractName, {
		from: deployer,
		contract: stake,
		args: [60, 35, tokenAddr],
		log: true,
	})
	const deployResult = await deployments.get(AresStakeContractName)
	const stakeAddr = deployResult.address
	return stakeAddr
}

async function deplopyReward60D(deployer: string, stakeAddr:string, tokenAddr: string, deployments: DeploymentsExtension): Promise<string> {
	await deployments.deploy(AresRewardContractName, {
		from: deployer,
		contract: reward,
		args: [stakeAddr, tokenAddr],
		log: true,
	})
	const deployResult = await deployments.get(AresRewardContractName)
	const rewardAddr = deployResult.address
	return rewardAddr
}

deployFuc.tags = [TokenConrtactName, AresStakeContractName, AresRewardContractName]

export default deployFuc
