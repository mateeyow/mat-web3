// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

// Uncomment this line to use console.log
import "hardhat/console.sol";

/// @custom:security-contact matthew.torres211@gmail.com
contract Mat is ERC1155, Ownable, ERC1155Burnable, ERC1155Supply {
    uint64 public constant COIN_ID = 0;
    uint8 private constant MIN_MINT_AMOUNT = 1;
    uint8 private constant MAX_MINT_AMOUNT = 2;
    uint private constant CHECK_IN_INTERVAL = 86400; // 24 hours
    string public constant name = "My Awesome Token";
    string public constant symbol = "MAT";

    struct User {
        uint lastCheckIn;
        bool initialized;
    }

    mapping(address => User) public users;

    constructor() ERC1155("") {}

    event CheckedIn(address userAddress, uint amount);
    event NewUser(address userAddress);

    function checkIn(address userAddress) external {
        User storage user = users[userAddress];
        bool hasCheckedInToday = hasCheckedIn(
            user.lastCheckIn,
            block.timestamp
        );
        require(!hasCheckedInToday, "User has already checked in today");

        user.lastCheckIn = block.timestamp;

        uint coinVal = getRandomValue();
        _mint(userAddress, COIN_ID, coinVal, "");

        emit CheckedIn(userAddress, coinVal);
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

    function getUser(
        address userAddress
    ) public view returns (User memory, uint balance) {
        User memory user = users[userAddress];
        require(user.initialized, "User does not exist");

        uint bal = balanceOf(userAddress, COIN_ID);
        return (users[userAddress], bal);
    }

    function createUser(address userAddress) public {
        User storage user = users[userAddress];
        require(!user.initialized, "User already exists");

        user.lastCheckIn = 0;
        user.initialized = true;

        emit NewUser(userAddress);
    }

    function hasCheckedIn(
        uint lastCheckIn,
        uint timeNow
    ) private pure returns (bool) {
        return timeNow - lastCheckIn < CHECK_IN_INTERVAL;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
