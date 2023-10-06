const { expect } = require("chai")
const hre = require("hardhat")
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers")

describe("SmartClass", function () {
    async function deploySmartClassFixture() {
        const classD = await hre.ethers.deployContract("D")

        return { classD }
    }

    it('should be correct deploy', async function () {
        const { classD } = await loadFixture(deploySmartClassFixture)
        console.log(await classD.getAddress())
        expect(await classD.getAddress()).to.exist;
    });

    it('should be deposit made', async function() {
        const { classD } = await loadFixture(deploySmartClassFixture)

        await classD.deposit(11)
        const deposit = await classD.getDeposited();
        console.log(deposit);
        expect(deposit).to.equal(11)
    });
});