// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Mat {
    string public name = "My Awesome Token";
    string public symbol = "MAT";
    struct User {
        uint lastCheckIn;
        uint balance;
        bool initialized;
    }

    address public owner;
    mapping(address => User) public users;
    uint8 private constant MIN_MINT_AMOUNT = 1;
    uint8 private constant MAX_MINT_AMOUNT = 2;

    constructor() {
        owner = msg.sender;
    }

    event CheckedIn(address userAddress, uint balance);
    event NewUser(address userAddress);

    function checkIn(address userAddress) external {
        User storage user = users[userAddress];

        user.lastCheckIn = block.timestamp;
        user.balance = getRandomValue();

        emit CheckedIn(userAddress, user.balance);
    }

    function getRandomValue() private view returns (uint) {
        uint randomness = uint(
            keccak256(
                abi.encodePacked(block.timestamp, block.prevrandao, msg.sender)
            )
        );

        return
            (randomness % (MAX_MINT_AMOUNT - MIN_MINT_AMOUNT + 1)) +
            MIN_MINT_AMOUNT;
    }

    function getUser(address userAddress) public view returns (User memory) {
        User memory user = users[userAddress];
        require(user.initialized, "User does not exist");

        return users[userAddress];
    }

    function createUser(address userAddress) public {
        User storage user = users[userAddress];
        require(!user.initialized, "User already exists");

        user.lastCheckIn = 0;
        user.balance = 0;
        user.initialized = true;

        emit NewUser(userAddress);
    }
}
