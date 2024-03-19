// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Materials is ERC1155 {
    uint256 public constant Wood  = 1;
    uint256 public constant Cement = 2;
    uint256 public constant Glass = 3;

    constructor() ERC1155("") {
    }

    function mintMaterial(address _account, uint256 _id) public {
        if (_id == 0) _mint(_account, Wood, 1, "");
        else if (_id == 1) _mint(_account, Cement, 1, "");
        else if (_id == 2) _mint(_account, Glass, 1, "");
    }
}