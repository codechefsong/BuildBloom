import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("BuildPoint", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  const BuildPoint = await hre.ethers.getContract<Contract>("BuildPoint", deployer);

  await deploy("Materials", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  const Materials = await hre.ethers.getContract<Contract>("Materials", deployer);

  await deploy("BuildBloom", {
    from: deployer,
    // Contract constructor arguments
    args: [deployer, await BuildPoint.getAddress(), await Materials.getAddress()],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const yourContract = await hre.ethers.getContract<Contract>("BuildBloom", deployer);
  console.log("First Building:", await yourContract.addBuilding("51.51", "-0.095"));
  console.log("First Wood shop:", await yourContract.addShop("51.50", "-0.089", 0));
  console.log("First Cement shop:", await yourContract.addShop("51.52", "-0.1", 1));
  console.log("First Glass shop:", await yourContract.addShop("51.51", "-0.08", 2));
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["BuildBloom"];
