import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Mat", function () {
  async function deployContract() {
    const [owner, otherAccount] = await ethers.getSigners()

    const Mat = await ethers.getContractFactory("Mat")
    const mat = await Mat.deploy()

    return { mat, owner, otherAccount }
  }

  describe("deployment", () => {
    it('should show the correct name, token and owner', async () => {
      const { mat, owner } = await loadFixture(deployContract)

      expect(await mat.name()).to.equal('My Awesome Token')
      expect(await mat.symbol()).to.equal('MAT')
      expect(await mat.owner()).to.equal(owner.address)
    })
  })

  describe('user', () => {
    it('should create a new user with zero balance', async () => {
      const { mat, otherAccount } = await loadFixture(deployContract)

      await mat.createUser(otherAccount.address)

      const user = await mat.getUser(otherAccount.address)

      expect(user.balance.toString()).to.equal("0")
      expect(user.lastCheckIn.toString()).to.equal("0")
      expect(user.initialized).to.be.true;
    })
  })

  describe('check-in', () => {
    it('should be able to checkIn successfully', async () => {
      const { mat, otherAccount } = await loadFixture(deployContract)
  
      await mat.createUser(otherAccount.address)

      await mat.checkIn(otherAccount.address)

      const user = await mat.getUser(otherAccount.address)

      expect(user.balance.toString()).to.not.equal("0")
      expect(user.lastCheckIn.toString()).to.not.equal("0")
    })
  })
});
