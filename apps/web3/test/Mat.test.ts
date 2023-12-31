import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Mat", () => {
  async function deployContract() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Mat = await ethers.getContractFactory("Mat");
    const mat = await Mat.deploy();

    return { mat, owner, otherAccount };
  }

  describe("deployment", () => {
    it("should show the correct name, token and owner", async () => {
      const { mat, owner } = await loadFixture(deployContract);

      expect(await mat.name()).to.equal("My Awesome Token");
      expect(await mat.symbol()).to.equal("MAT");
      expect(await mat.owner()).to.equal(owner.address);
    });
  });

  describe("user", () => {
    it("should create a new user with zero balance", async () => {
      const { mat, otherAccount } = await loadFixture(deployContract);

      await expect(mat.createUser(otherAccount.address))
        .to.emit(mat, "NewUser")
        .withArgs(otherAccount.address);
    });

    it("should be able to get the newly created user", async () => {
      const { mat, otherAccount } = await loadFixture(deployContract);

      await mat.createUser(otherAccount.address);

      const [user, balance] = await mat.getUser(otherAccount.address);

      expect(balance).to.equal(BigInt(0));
      expect(user.lastCheckIn).to.equal(BigInt(0));
    });
  });

  describe("check-in", () => {
    it("should be able to checkIn successfully", async () => {
      const { mat, otherAccount } = await loadFixture(deployContract);

      await mat.createUser(otherAccount.address);

      await expect(mat.checkIn(otherAccount.address))
        .to.emit(mat, "CheckedIn")
        .withArgs(otherAccount.address, anyValue);

      const result = await mat.getUser(otherAccount.address);
      const { 0: user, 1: balance } = result;
      expect(balance).to.not.equal(BigInt(0));
      expect(user.lastCheckIn).to.not.equal(BigInt(0));
    });

    // it('should be able to checkIn multiple times', async () => {
    //   const { mat, otherAccount } = await loadFixture(deployContract)

    //   await mat.createUser(otherAccount.address)

    //   await expect(mat.checkIn(otherAccount.address))
    //     .to.emit(mat, 'CheckedIn')
    //     .withArgs(otherAccount.address, anyValue)

    //   await mat.checkIn(otherAccount.address)
    //   await mat.checkIn(otherAccount.address)

    //   const result = await mat.getUser(otherAccount.address)
    //   const { 0: user, 1: balance } = result
    //   expect(balance).to.equal(BigInt(3))
    // })

    it("should fail to checkIn if the user has checked in within the last 24 hours", async () => {
      const { mat, otherAccount } = await loadFixture(deployContract);

      await mat.createUser(otherAccount.address);

      await mat.checkIn(otherAccount.address);

      await expect(mat.checkIn(otherAccount.address)).to.be.revertedWith(
        "User has already checked in today",
      );
    });
  });
});
