//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./BuildPoint.sol";
import "./Materials.sol";

contract BuildBloom {
  BuildPoint public buildPoint;
  Materials public materials;

  address public immutable owner;

  Building[] public buildings;
  Shop[] public shops;

  struct Building {
    string lat;
    string lng;
  }

  struct Shop {
    string lat;
    string lng;
    uint256 materialType;
  }

  constructor(address _owner, address _tokenAddress, address _multTokenAddress) {
    owner = _owner;
    buildPoint = BuildPoint(_tokenAddress);
    materials = Materials(_multTokenAddress);
  }

  function getBuildings() public view returns (Building[] memory){
    return buildings;
  }

  function getShops() public view returns (Shop[] memory){
    return shops;
  }

  function addBuilding(string calldata _lat, string calldata _lng) public {
    buildings.push(Building(_lat, _lng));
  }

  function addShop(string calldata _lat, string calldata _lng, uint256 _materialType) public {
    shops.push(Shop(_lat, _lng, _materialType));
  }

  function mintMaterial(uint256 _id) public {
    materials.mintMaterial(msg.sender, _id);
  }

  modifier isOwner() {
    require(msg.sender == owner, "Not the Owner");
    _;
  }

  function withdraw() public isOwner {
    (bool success, ) = owner.call{ value: address(this).balance }("");
    require(success, "Failed to send Ether");
  }

  receive() external payable {}
}
