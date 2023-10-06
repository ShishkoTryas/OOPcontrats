const hre = require("hardhat")

async function main() {
  const classD = await hre.ethers.deployContract("D");
  await classD.waitForDeployment();
  console.log("Contract D address :", await classD.getAddress());

  console.log("Private variable c in contract C = ", await classD.getC());

  const depositTX = await classD.deposit(11);
  await depositTX.wait();
  console.log("Private variable deposited in contract A = ", await classD.getDeposited())

  const contractAddress = "0x0EB6217372b7498F2074C686169D77ea390A5Eb8";
  const signer = await hre.ethers.provider.getSigner()
  const contractABI = [{"inputs":[{"internalType":"address","name":"d_","type":"address"}],"name":"validate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
  const contract = new hre.ethers.Contract(contractAddress, contractABI, signer);

  const isValid = await contract.validate(await classD.getAddress());
  await isValid.wait();
  if (isValid) {
    console.log("Validation successful.");
  } else {
    console.log("Validation failed.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});